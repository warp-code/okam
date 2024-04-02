// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {UsageToken} from "../src/UsageToken.sol";
import {OwnershipToken} from "../src/OwnershipToken.sol";

contract UsageTokenTest is Test {
    UsageToken usageToken;
    OwnershipToken ownershipToken;

    function setUp() public {
        ownershipToken = new OwnershipToken();
        usageToken = new UsageToken(address(ownershipToken));
    }

    function test_shouldMint() public {
        address caller = address(1337);
        deal(caller, 100 ether);

        vm.startPrank(caller);

        uint256 ot = ownershipToken.registerOwner(1, 1, 1 ether, "asdfgh");

        usageToken.mint{value: 1 ether}(ot);

        uint256 balance = usageToken.getBalance();

        vm.stopPrank();

        assert(balance > 0);
    }
}
