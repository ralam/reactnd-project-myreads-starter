import React, { Component } from "react";

import Book from "./Book";

class BookShelf extends Component {
  handleBookMove = (book, newShelfLabel) => {
    if (newShelfLabel !== book.shelf) {
      this.props.moveBook(book, newShelfLabel);
    }
  };

  render() {
    const { shelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.label}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelf.books.map(book => (
              <li key={`${book.id}`}>
                <Book book={book} handleBookMove={this.handleBookMove} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
