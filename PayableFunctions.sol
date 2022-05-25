//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract PayableFunctions{

    bool public myBoolean;
    string public myString;
    uint public myNumber;

    mapping(uint => bool) public myMapping;
    mapping(address => uint) public myAddressMapping;

    function setValue(uint index, bool value) public {
        myMapping[index] = value;
    }

    function setAddress(address wallet, uint balance) public {
        myAddressMapping[wallet] = balance;
    }

    function recieveMoney() public payable {
        myAddressMapping[msg.sender] += msg.value;
    }

    function withdrawMoney(uint ammount) public {
        address myWallet = msg.sender;
        myAddressMapping[myWallet] -= ammount * (10**18);
        payable(myWallet).transfer(ammount * (10**18));
    }

}