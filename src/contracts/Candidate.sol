//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Candidate {

    address candidateAddress;
    uint votes;

    constructor(address addy) {
        votes = 0;
        candidateAddress = addy;
    }

}