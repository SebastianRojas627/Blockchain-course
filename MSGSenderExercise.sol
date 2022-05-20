//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Inbox {

    string public message;
    address private ownerAddress;

    constructor (string memory initialMessage) {
        ownerAddress = msg.sender;
        //Recuerda la direccion de billetera del dueño del contract
        message = initialMessage;
    }

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public { 
        //memory hace que la variable se guarde temporalmente en el smart contract

        require (msg.sender == ownerAddress, "Contract caller must be the owner");
        //Verificar que dueño de contrato es el unico que puede modificar mensaje
        message = newMessage;
    }

}
