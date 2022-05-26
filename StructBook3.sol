//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract StructTest {

    struct Book {
        string title;
        string author;
        uint id;
        uint quantity;
        bool available;
    }

    Book public book1;
    Book public book2 = Book("title example", "Messi", 2, 10, true);

    mapping(uint => Book) public libraryBooks;

    function borrowBook(uint idBook) public {
        libraryBooks[idBook].quantity--;
    }

    function getBook(uint idBook) public view returns (bool) {
        return libraryBooks[idBook].available;
    }

    function addBook(Book memory newBook) public {
        libraryBooks[newBook.id] = newBook;
    }

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