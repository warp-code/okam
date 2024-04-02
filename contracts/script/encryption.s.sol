// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {OwnershipToken} from "../src/OwnershipToken.sol";
import {AccessToken} from "../src/AccessToken.sol";

contract CounterScript is Script {
    OwnershipToken ownershipToken;
    AccessToken accessToken;


    function setUp() public {
        ownershipToken = OwnershipToken(address(0x5FbDB2315678afecb367f032d93F642f64180aa3));
        accessToken = AccessToken(address(0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512));
        
    }

    function run() public {
        uint256 deployerPrivateKey = 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
        vm.startBroadcast(deployerPrivateKey);

        address to = address(0x0ED22E365887E7c349fB1eF49972510d0587a6fd);
        uint256 ownershipTokenId = ownershipToken.registerOwner(0, 0, 100, "asdf");

        accessToken.mint{value: 100}(ownershipTokenId, to);

        vm.stopBroadcast();
    }
}
