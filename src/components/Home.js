import React, { Component } from "react";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";

class Home extends Component {
  render() {
    const { shelves } = this.props;
    const shelfKeys = Object.keys(shelves);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfKeys.map(shelfKey => (
              <BookShelf key={shelfKey} shelf={shelves[shelfKey]} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Search for a book</Link>
        </div>
      </div>
    );
  }
}

export default Home;
