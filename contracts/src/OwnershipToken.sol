// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract OwnershipToken is ERC721 {
    struct TokenDetails {
        CurveParams curveParams;
        string fileCid;
    }

    struct CurveParams {
        uint256 quadraticParam;
        uint256 linearParam;
        uint256 constantParam;
    }

    uint256 _nextTokenId = 0;

    mapping(uint256 tokenId => TokenDetails) _details;

    constructor() ERC721("OwnerToken", "OWN") {}

    function registerOwner(uint256 quadraticParam, uint256 linearParam, uint256 constantParam, string calldata fileCid)
        external
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;

        _details[tokenId] = TokenDetails(CurveParams(quadraticParam, linearParam, constantParam), fileCid);

        _safeMint(_msgSender(), tokenId);

        return tokenId;
    }

    /**
     * @dev Return a tuple of quadratic, linear and constant curve params
     */
    function getCurveParams(uint256 tokenId) external view returns (uint256, uint256, uint256) {
        return (
            _details[tokenId].curveParams.quadraticParam,
            _details[tokenId].curveParams.linearParam,
            _details[tokenId].curveParams.constantParam
        );
    }

    function getFileCid(uint256 tokenId) external view returns (string memory) {
        if (!_isAuthorized(ownerOf(tokenId), msg.sender, tokenId)) {
            revert ERC721IncorrectOwner(msg.sender, tokenId, ownerOf(tokenId));
        }

        return _details[tokenId].fileCid;
    }
}
