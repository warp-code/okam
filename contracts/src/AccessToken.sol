// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {UsageToken} from "./UsageToken.sol";
import {OwnershipToken} from "./OwnershipToken.sol";

contract AccessToken is ERC721 {
    address private immutable _usageTokenAddress;
    address private immutable _ownershipTokenAddress;
    uint256 private _nextTokenId = 0;

    mapping(uint256 => uint256) private relatedUsageTokenId;

    constructor(address ownershipTokenAddress, address usageTokenAddress) ERC721("AccessToken", "ACC") {
        _usageTokenAddress = usageTokenAddress;
        _ownershipTokenAddress = ownershipTokenAddress;
    }

    function mint(address to, uint256 usageTokenId) external returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        relatedUsageTokenId[tokenId] = usageTokenId;

        _safeMint(to, tokenId);

        return tokenId;
    }

    function getUsageTokenId(uint256 tokenId) external view returns (uint256) {
        return relatedUsageTokenId[tokenId];
    }

    function getFileCid(uint256 tokenId) external view returns (string memory) {
        return OwnershipToken(_ownershipTokenAddress).getFileCid(
            UsageToken(_usageTokenAddress).getRelatedOwnershipTokenId(tokenId)
        );
    }
}
