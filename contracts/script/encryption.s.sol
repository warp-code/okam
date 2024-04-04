// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {OwnershipToken} from "../src/OwnershipToken.sol";
import {UsageToken} from "../src/UsageToken.sol";
import {AccessToken} from "../src/AccessToken.sol";

contract CounterScript is Script {
    OwnershipToken ownershipToken;
    UsageToken usageToken;
    AccessToken accessToken;

    function setUp() public {
        ownershipToken = OwnershipToken(address(0x42A6a3d5e8651Ce1c56EC418301DDaf7513B8aAd));
        usageToken = UsageToken(address(0xa612237E6302b07230bbe4aebE978eFcDbBAbA24));
        accessToken = AccessToken(address(0x59fE0075F6AC7b8D9bFf8e36E814568ed45c30ad));
    }

    function run() public {
        address awaiterAddr = 0xa68868BDcFFE7B6fbb1637e72DC8a2959d426D13;

        uint256 deployerPrivateKey = 1337;

        vm.startBroadcast(deployerPrivateKey);

        uint256 ownershipTokenId = ownershipToken.registerOwner(0, 0, 100, "asdf");

        uint256 usageTokenId = usageToken.mint{value: 100}(ownershipTokenId);

        accessToken.mint(awaiterAddr, usageTokenId);

        vm.stopBroadcast();
    }
}
