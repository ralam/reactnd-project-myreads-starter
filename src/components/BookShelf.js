import React, { Component } from "react";

import Book from "./Book";

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf.label}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.shelf.books.map(book => (
            <li key={`${book.id}`}>
              <Book book={book} moveBook={props.moveBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
