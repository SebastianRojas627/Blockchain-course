//SPDX-License-Identifier: GPL-3.0

//Contract address: 0x69CFC520242C4A070dAbD31BCdC83a1BAfcCA4Ad
pragma solidity ^0.8.0;

contract Inbox {

    string public message;
    address private ownerAddress;

    constructor (string memory initialMessage) {
        ownerAddress = msg.sender;
        message = initialMessage;
    }

    function getMessage() public view ownerRestricted(msg.sender) returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public ownerRestricted(msg.sender) { 
        //memory hace que la variable se guarde temporalmente en el smart contract
        message = newMessage;
    }

    modifier ownerRestricted(address client) {
        require(client == ownerAddress, "Only owner can access the message");
        _;
    }

}
