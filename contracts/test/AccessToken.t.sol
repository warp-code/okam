// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {UsageToken} from "../src/UsageToken.sol";
import {OwnershipToken} from "../src/OwnershipToken.sol";
import {AccessToken} from "../src/AccessToken.sol";

contract AccessTokenTest is Test {
    UsageToken usageToken;
    OwnershipToken ownershipToken;
    AccessToken accessToken;

    function setUp() public {
        ownershipToken = new OwnershipToken();
        usageToken = new UsageToken(address(ownershipToken));
        accessToken = new AccessToken(address(ownershipToken), address(usageToken));
    }

    function test_shouldMint() public {
        string memory testCid = "asdfgh";

        address caller = address(1337);
        deal(caller, 100 ether);

        vm.startPrank(caller);

        uint256 ot = ownershipToken.registerOwner(1, 1, 1, testCid);

        uint256 usageTokenId = usageToken.mint{value: 1}(ot);

        uint256 accessTokenId = accessToken.mint(caller, usageTokenId);

        string memory actualCid = accessToken.getFileCid(accessTokenId);

        vm.stopPrank();

        assertEq(actualCid, testCid);
    }
}
