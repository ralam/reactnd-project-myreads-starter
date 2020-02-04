import React, { Component } from "react";

import Book from "./Book";

class BookShelf extends Component {
  render() {
    const { shelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.label}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelf.books.map((book, idx) => (
              <li key={`${book.title}-idx`}>
                {shelf.books.length && <Book book={book} />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
