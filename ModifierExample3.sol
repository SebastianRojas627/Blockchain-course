//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract StructTest {

    struct Book {
        string title;
        string author;
        uint id;
        bool available;
    }

    Book public book1;
    Book public book2 = Book("title example", "Messi", 2, true);

    function getTitle() public view returns(string memory) {
        return book1.title;
    }

    function setTitle() public {
        book1.title = "my title";
    }

    function getTitleAndIdBook2() public view returns(string memory, uint) {
        return (book2.title, book2.id);
    }

}