//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Inbox {

    string public message; // variables can be initializaed at declaration

    constructor (string memory initialMessage) {
        message = initialMessage;
    }

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public { 
        //memory hace que la variable se guarde temporalmente en el smart contract
        message = newMessage;
    }

}
