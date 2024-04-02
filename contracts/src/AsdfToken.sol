// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AsdfToken is ERC721 {
    uint256 _nextTokenId = 0;

    constructor() ERC721("AsdfToken", "ASDF") {}

    function mint(address to) external returns(uint256) {
        uint256 tokenId = _nextTokenId++;

        _safeMint(to, tokenId);

        return tokenId;
    }
}
