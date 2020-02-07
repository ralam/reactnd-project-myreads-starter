import React, { Component } from "react";
import { Link } from "react-router-dom";

import Book from "./Book";

class Search extends Component {
  state = {
    searchTerm: ""
  };

  handleUpdate = e => {
    const value = e.target.value;
    this.props.handleSearchUpdate(value);
    this.setState(() => ({
      searchTerm: value
    }));
  };

  handleBookMove = (book, newShelfLabel) => {
    this.props.moveBook(book, newShelfLabel);
  };

  render() {
    const { books } = this.props;
    const { searchTerm } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={searchTerm}
              onChange={this.handleUpdate}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books &&
              books.map(book => (
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

export default Search;
