// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.20;

abstract contract Security {
    modifier onlyTokenOwner(uint256 tokenId, mapping(uint256 tokenId => address) storage owners) {
        require(msg.sender == owners[tokenId], "Unauthoritzed. Must be token owner.");
        _;
    }
}
