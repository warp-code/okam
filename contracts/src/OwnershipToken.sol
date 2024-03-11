// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract OwnershipToken is ERC721, Ownable {
    // replace files type with file struct
    struct TokenDetails {
        CurveParams curveParams;
        uint256 files;
    }

    struct CurveParams {
        uint256 quadraticParam;
        uint256 linearParam;
        uint256 constantParam;
    }

    // don't know what goes here yet
    struct File {
        uint256 id;
        string something;
    }

    uint256 _nextTokenId = 0;

    mapping(uint256 tokenId => address) _owners;
    mapping(uint256 tokenId => TokenDetails) _details;

    constructor(address creator) ERC721("OwnerToken", "OWN") Ownable(creator) {}

    event GasConsumed(uint256);

    modifier measureGas() {
        uint256 gasStart = gasleft();
        _;
        uint256 gasUsed = gasStart - gasleft();
        emit GasConsumed(gasUsed);
    }

    modifier onlyNftOwner(uint256 tokenId) {
        require(msg.sender == _owners[tokenId], "Unauthoritzed. Must be NFT owner.");
        _;
    }

    function registerOwner(uint256 quadraticParam, uint256 linearParam, uint256 constantParam) external measureGas {
        uint256 tokenId = _nextTokenId++;

        CurveParams memory _params = CurveParams(quadraticParam, linearParam, constantParam);

        _details[tokenId] = TokenDetails(_params, 0);

        _owners[tokenId] = _msgSender();

        _safeMint(_msgSender(), tokenId);
    }

    function getCurveParams(uint256 tokenId) external onlyNftOwner(tokenId) measureGas returns (CurveParams memory) {
        return _details[tokenId].curveParams;
    }

    function getFiles(uint256 tokenId) external onlyNftOwner(tokenId) measureGas returns (uint256) {
        return _details[tokenId].files;
    }

    function appendFiles() external {}

    function mintOwnershipToken() external {}
}