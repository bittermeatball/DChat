// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserLocation {
    struct Location {
        uint id;
        string ip;
        string device;
    }

    function getIp() public pure returns (string memory){
        return "Hello world";
    }
}