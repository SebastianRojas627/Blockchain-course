//SPDX-License-Identifier: GPL-3.0

//Contract address: 0x69CFC520242C4A070dAbD31BCdC83a1BAfcCA4Ad
pragma solidity ^0.8.0;

contract ModifierExample {

    bool public myBoolean;
    string public myString;
    uint public myNumber;

    mapping(uint => bool) public myMapping;

    function setValue(uint index, bool value) public {
        myMapping[index] = value;
    }

    mapping(address => uint) public myAddressMapping;

    function setValue(address wallet, uint balance) public {
        myAddressMapping[wallet] = balance;
    }

}