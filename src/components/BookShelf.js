import React, { Component } from "react";

import Book from "./Book";

class BookShelf extends Component {
  handleBookMove = (book, newShelfLabel) => {
    const { shelfName, moveBook } = this.props;
    if (newShelfLabel !== shelfName) {
      moveBook(book, shelfName, newShelfLabel);
    }
  };

  render() {
    const { shelf, shelfName } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.label}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelf.books.map((book, idx) => (
              <li key={`${book.id}`}>
                {shelf.books.length && (
                  <Book
                    book={book}
                    currentShelf={shelfName}
                    handleBookMove={this.handleBookMove}
                    showNoneOption={true}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
