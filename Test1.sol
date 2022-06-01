//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

//bloque Goerli: https://goerli.etherscan.io/address/0x5Dcbda4238780fcdaFF7Ba98290341084E985d86

contract Test1 {

    address private ownerAddress;
    bool private closedRevision;
    uint private universityBalance;

    constructor () {

        ownerAddress = msg.sender;
        closedRevision = false;

    }

    struct Grade {

        uint id;
        string name;
        uint score;
        bool finalized;
        uint typeTest;

    }

    mapping(uint => Grade) public gradesMapping;

    event Congratulations(bytes name, bytes message);

    function addGrade(string memory name, uint id) public revisionClosed onlyOwner {

        require(bytes(name).length > 5, "Student name must be longer than 5 characters");
        Grade memory studentGrade = Grade(id, name, 0, false, 0);
        gradesMapping[id] = studentGrade;
        if(gradesMapping[id].score == 100) {
            emit Congratulations(bytes(gradesMapping[id].name), bytes("Congratulations"));
        }

    }

    function finalizeGrade(uint id, uint newScore) public revisionClosed onlyOwner {
        
        if (newScore > 90) {
            newScore = 100;
        }

        Grade memory studentGrade = gradesMapping[id];
        Grade memory finalizedGrade = Grade(id, studentGrade.name, newScore, true, 1);
        gradesMapping[id] = finalizedGrade;

    }

    function getGrade(uint id) public view revisionClosed returns(Grade memory) {

        return gradesMapping[id];

    }

    function finalizeGrading() public revisionClosed onlyOwner {

        closedRevision = true;

    }

    function reOpenGrading() public onlyOwner {

        closedRevision = false;

    }

    function request2T(uint id) public payable revisionClosed onlyOwner {

        Grade memory studentGrade = gradesMapping[id];
        Grade memory newGrade = Grade(id, studentGrade.name, 0, false, 2);

        require(studentGrade.finalized && studentGrade.typeTest == 1, "Test not graded yet");

        address studentAddress = msg.sender;
        uint amount = 10**18;
        require(amount <= studentAddress.balance, "Not enough money");
        payable(studentAddress).transfer(amount);
        
        gradesMapping[id] = newGrade;

    }

    function getBalance() public revisionClosed onlyOwner returns(uint){

        return address(this).balance;

    }

    modifier onlyOwner {

      require(msg.sender == ownerAddress, "Only owner can perform this action");
      _;

   }

   modifier revisionClosed {

       require(!closedRevision, "Revision is closed, all actions are blocked");
       _;

   }

}