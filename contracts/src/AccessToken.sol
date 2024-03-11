// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error PriceMismatch(uint256 received, uint256 expected);

contract AccessToken is ERC721 {
    address private immutable _ownerTokenContractAddress;

    uint256 private _nextTokenId;

    mapping(uint256 => uint256) private _relatedOwnershipTokens;
    mapping(uint256 => uint256) private _supplyPerOwnershipToken;

    constructor(address ownerTokenContractAddress) ERC721("AccessToken", "ACC") {
        _ownerTokenContractAddress = ownerTokenContractAddress;
    }

    function mint(uint256 ownershipTokenId, address to) external payable {
        uint256 tokenId = _nextTokenId++;

        uint256 price = _currentPrice(_supplyPerOwnershipToken[ownershipTokenId], 1, 1, 1);

        // Revert if price mismatch
        if (price != msg.value) {
            revert PriceMismatch(msg.value, price);
        }

        // Transfer the price of the token to contract
        payable(address(this)).transfer(price);

        _supplyPerOwnershipToken[ownershipTokenId]++;
        _relatedOwnershipTokens[tokenId] = ownershipTokenId;

        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) external {
        _requireOwned(tokenId);

        uint256 ownershipTokenId = _relatedOwnershipTokens[tokenId];
        uint256 price = sellPrice(ownershipTokenId);

        // Contract will always have enough money
        payable(msg.sender).transfer(price);

        _burn(tokenId);
    }

    function buyPrice(uint256 ownershipTokenId) public view returns (uint256) {
        return _currentPrice(_supplyPerOwnershipToken[ownershipTokenId], 1, 1, 1);
    }

    function sellPrice(uint256 ownershipTokenId) public view returns (uint256) {
        return (buyPrice(ownershipTokenId) / 10) * 9;
    }

    function _currentPrice(uint256 supply, uint256 quad, uint256 lin, uint256 const) internal pure returns (uint256) {
        return quad * (supply * supply) + lin * supply + const;
    }
}
