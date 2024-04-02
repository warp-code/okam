// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {OwnershipToken} from "../src/OwnershipToken.sol";

contract OwnershipTokenTest is Test {
    OwnershipToken ownershipToken;

    function setUp() public {
        ownershipToken = new OwnershipToken();
    }

    function test_shouldMint() public {
        vm.prank(address(1337));
        uint256 a = ownershipToken.registerOwner(0, 0, 10000, "asdfgh");

        assert(a == 0);
    }

    function test_shouldAssignFile() public {
        string memory expectedCid = "should be this";

        vm.startPrank(address(1337));
        uint256 tokenId = ownershipToken.registerOwner(0, 0, 10000, "asdfgh");

        ownershipToken.assignFile(tokenId, expectedCid);

        string memory registeredCid = ownershipToken.getFileCid(tokenId);

        assertEq(registeredCid, expectedCid);

        vm.stopPrank();
    }
}
