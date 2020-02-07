import React, { Component } from "react";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";

function Home(props) {
  const { shelves, moveBook } = props;
  const shelfKeys = Object.keys(shelves);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfKeys.map(shelfKey => (
            <BookShelf
              key={shelfKey}
              shelfName={shelfKey}
              shelf={shelves[shelfKey]}
              moveBook={moveBook}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className="search-button">
          Add a book
        </Link>
      </div>
    </div>
  );
}

export default Home;
