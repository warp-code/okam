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
        ownershipToken = OwnershipToken(address(0x5FbDB2315678afecb367f032d93F642f64180aa3));
        usageToken = UsageToken(address(0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512));
        accessToken = AccessToken(address(0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0));
    }

    function run() public {
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        vm.startBroadcast(deployerPrivateKey);

        // uint256 ownershipTokenId = ownershipToken.registerOwner(0, 0, 100, "asdf");

        // usageToken.mint{value: 100}(ownershipTokenId);

        // accessToken.mint(address(0xD4d0533E58ae1Ec26d68d4aaf335A40BE776dc2B));
        // vm.stopBroadcast();
    }
}
