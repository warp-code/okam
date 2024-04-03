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
    address constant caller = address(1337);
    address constant noAccessCaller = address(1338);
    uint256 ownershipTokenId;
    uint256 usageTokenId;

    string constant testCid = "asdfgh";

    function setUp() public {
        ownershipToken = new OwnershipToken();
        usageToken = new UsageToken(address(ownershipToken));
        accessToken = new AccessToken(address(ownershipToken), address(usageToken));

        deal(caller, 100 ether);

        vm.startPrank(caller);

        ownershipTokenId = ownershipToken.registerOwner(1, 1, 1, testCid);
        usageTokenId = usageToken.mint{value: 1}(ownershipTokenId);

        vm.stopPrank();
    }

    function test_shouldMint() public {
        vm.startPrank(caller);

        uint256 accessTokenId = accessToken.mint(caller, usageTokenId);

        string memory actualCid = accessToken.getFileCid(accessTokenId);

        bool canAccess = accessToken.hasAccess(caller, usageTokenId);
        
        bool cantAccess = accessToken.hasAccess(noAccessCaller, usageTokenId);
        
        vm.stopPrank();

        assertEq(actualCid, testCid);
        assertEq(canAccess, true);
        assertEq(cantAccess, false);
    }

    function test_shouldNotMintWhenNoAccessToken() public {
        vm.startPrank(noAccessCaller);

        vm.expectRevert();
        accessToken.mint(noAccessCaller, usageTokenId);

        vm.stopPrank();
    }
}
