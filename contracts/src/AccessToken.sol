// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {OwnershipToken} from "./OwnershipToken.sol";

error PriceMismatch(uint256 received, uint256 expected);

contract AccessToken is ERC721 {
    address private immutable _ownershipTokenContractAddress;

    uint256 private _nextTokenId;

    mapping(uint256 => uint256) private _relatedOwnershipTokens;
    mapping(uint256 => uint256) private _supplyPerOwnershipToken;
    mapping(uint256 => uint256) private _earningsPerOwnershipToken;

    constructor(address ownershipTokenContractAddress) ERC721("AccessToken", "ACC") {
        if (ownershipTokenContractAddress == address(0)) {
            revert ERC721InvalidOwner(ownershipTokenContractAddress);
        }

        _ownershipTokenContractAddress = ownershipTokenContractAddress;
    }

    function mint(uint256 ownershipTokenId, address to) external payable {
        uint256 tokenId = _nextTokenId++;

        uint256 price = buyPrice(ownershipTokenId);

        // Revert if price doesn't match base transfer value
        if (price != msg.value) {
            revert PriceMismatch(msg.value, price);
        }

        _supplyPerOwnershipToken[ownershipTokenId]++;
        _relatedOwnershipTokens[tokenId] = ownershipTokenId;

        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) external {
        if (!_isAuthorized(ownerOf(tokenId), msg.sender, tokenId)) {
            revert ERC721IncorrectOwner(msg.sender, tokenId, ownerOf(tokenId));
        }

        uint256 ownershipTokenId = _relatedOwnershipTokens[tokenId];
        uint256 price = sellPrice(ownershipTokenId);
        uint256 saleEarnings = buyPrice(ownershipTokenId) - price;

        // Contract will always have enough money
        payable(msg.sender).transfer(price);

        _earningsPerOwnershipToken[ownershipTokenId] += saleEarnings;

        _burn(tokenId);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getSupply(uint256 ownershipTokenId) external view returns (uint256) {
        return _supplyPerOwnershipToken[ownershipTokenId];
    }

    function buyPrice(uint256 ownershipTokenId) public view returns (uint256) {
        (uint256 quadratic, uint256 linear, uint256 const) =
            OwnershipToken(_ownershipTokenContractAddress).getCurveParams(ownershipTokenId);

        return _currentPrice(_supplyPerOwnershipToken[ownershipTokenId], quadratic, linear, const);
    }

    function sellPrice(uint256 ownershipTokenId) public view returns (uint256) {
        return (buyPrice(ownershipTokenId) * 9) / 10;
    }

    function earnings(uint256 ownershipTokenId) public view returns (uint256) {
        return _earningsPerOwnershipToken[ownershipTokenId];
    }

    function _currentPrice(uint256 supply, uint256 quad, uint256 lin, uint256 const) internal pure returns (uint256) {
        return quad * (supply * supply) + lin * supply + const;
    }
}
