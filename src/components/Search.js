import React, { Component } from "react";
import { Link } from "react-router-dom";

import Book from "./Book";

class Search extends Component {
  state = {
    searchTerm: ""
  };

  /**
   * Handle updates from the controlled <input> component for search
   * Send the search query up to parent component's `handleSearchUpdate`
   */
  handleUpdate = e => {
    const value = e.target.value;
    this.props.handleSearchUpdate(value);
    this.setState(() => ({
      searchTerm: value
    }));
  };

  render() {
    const { books, moveBook } = this.props;
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
                  <Book book={book} moveBook={moveBook} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
