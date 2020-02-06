import React, { Component } from "react";

class Book extends Component {
  handleMove = e => {
    e.preventDefault();
    const newShelfLabel = e.target.value;
    const { book, handleBookMove } = this.props;
    handleBookMove(book, newShelfLabel);
  };

  render() {
    const { book, currentShelf, showNoneOption } = this.props;
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
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={currentShelf} onChange={this.handleMove}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              {showNoneOption && <option value="none">None</option>}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors.map((author, idx) => (
          <div className="book-authors" key={`${book.id}-${idx}`}>
            {author}
          </div>
        ))}
      </div>
    );
  }
}

export default Book;
