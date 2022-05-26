//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract ModifierExample {

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

    function withdrawMoney(uint ammountW) public {
        uint ammountE = ammountW * (10**18);
        require(ammountE <= myAddressMapping[msg.sender], "Not enough money");
        myAddressMapping[msg.sender] -= ammountE;
        address myWallet = msg.sender;
        payable(myWallet).transfer(ammountE);

            //using the if conditional
            //if (ammountE <= myAddressMapping[msg.sender]) {
            //address myWallet -= amountE;
            //address myWallet = msg.sender;
            //payable(myWallet).transfer(ammountE);
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

}