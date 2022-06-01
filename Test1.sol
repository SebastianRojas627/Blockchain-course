//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Test1 {

    address private ownerAddress;
    bool private closedRevision;

    constructor () {
        ownerAddress = msg.sender;
        closedRevision = false;
    }

    struct Grades {
        uint id;
        string name;
        uint grade;
        bool finalized;
        uint typeTest;
    }

    mapping(uint => Grades) public gradesMapping;

    function addGrade(string memory name, uint id) public revisionClosed onlyOwner() {

        Grades memory studentGrade = Grades(id, name, 0, false, 0);
        gradesMapping[id] = studentGrade;

    }

    function finalizeGrade(uint id, uint newGrade) public revisionClosed onlyOwner {

        Grades memory studentGrade = gradesMapping[id];
        if (newGrade > 90) {
            studentGrade.grade = 100;
        } else {
        studentGrade.grade = newGrade;
        }
        studentGrade.finalized = true;
        studentGrade.typeTest = 1;

    }

    function getGrade(uint id) public view revisionClosed returns(uint) {

        return gradesMapping[id].grade;

    }

    function finalizeGrading() public revisionClosed onlyOwner {

        closedRevision = true;

    }

    function reOpenGrading() public onlyOwner {

        closedRevision = false;

    }

    modifier onlyOwner {
      require(msg.sender == ownerAddress, "Only owner can perform this action");
      _;
   }

   modifier revisionClosed {
       require(!closedRevision, "Revision is closes, all actions are blocked");
       _;
   }

}