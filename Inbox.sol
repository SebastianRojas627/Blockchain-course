//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Inbox {

    string public message;
    address private ownerAddress;

    constructor (string memory initialMessage) {
        ownerAddress = msg.sender;
        message = initialMessage;
    }

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public ownerRestricted(msg.sender) { 
        //memory hace que la variable se guarde temporalmente en el smart contract
        message = newMessage;
    }

    modifier ownerRestricted(address client) {
        //Verifica que una funcion haya sido llamada por el dueño
        require(client == ownerAddress, "Only the owner can access the message");
        _;
    }

}