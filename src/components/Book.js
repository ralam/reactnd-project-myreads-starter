import React, { Component } from "react";

class Book extends Component {
  /**
   * Check if a book should be moved based on the value of the option clicked.
   * If the option value is different from the book's current shelf, move it.
   * Otherwise, do nothing
   */
  handleMove = e => {
    e.preventDefault();
    const newShelfLabel = e.target.value;
    const { book, moveBook } = this.props;
    if (newShelfLabel !== book.shelf) {
      moveBook(book, newShelfLabel);
    }
  };

  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 170,
              backgroundSize: "auto",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${book.imageLinks.smallThumbnail ||
                book.imageLinks.thumbnail})`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={book.shelf || "none"} onChange={this.handleMove}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none" disabled>
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          book.authors.map((author, idx) => (
            <div className="book-authors" key={`${book.id}-${idx}`}>
              {author}
            </div>
          ))}
      </div>
    );
  }
}

export default Book;
