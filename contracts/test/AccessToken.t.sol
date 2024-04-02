// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {AccessToken} from "../src/AccessToken.sol";
import {OwnershipToken} from "../src/OwnershipToken.sol";

contract AccessTokenTest is Test {
    AccessToken accessToken;
    OwnershipToken ownershipToken;

    function setUp() public {
        ownershipToken = new OwnershipToken();
        accessToken = new AccessToken(address(ownershipToken));
    }

    function test_shouldMint() public {
        address caller = address(1337);
        deal(caller, 100 ether);

        vm.startPrank(caller);

        uint256 ot = ownershipToken.registerOwner(1, 1, 1 ether, "asdfgh");

        accessToken.mint{value: 1 ether}(ot);

        uint256 balance = accessToken.getBalance();

        vm.stopPrank();

        assert(balance > 0);
    }
}
