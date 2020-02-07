import React from "react";
import { Route } from "react-router-dom";
import { debounce } from "debounce";

import Home from "./components/Home";
import Search from "./components/Search";
import * as BooksAPI from "./BooksAPI";

// import * as BooksAPI from './BooksAPI'
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          books: books
        }));
      })
      .catch(err => console.error(err));
  }

  /**
   * Move a book to a new shelf and update the state.
   * @param {object} book: Book to be moved
   * @param {string} newShelfName: The shelf to move the book to
   */
  moveBook = (book, newShelfName) => {
    BooksAPI.update(book, newShelfName)
      .then(res => {
        this.setState(currentState => {
          book.shelf = newShelfName;
          const otherBooks = currentState.books.filter(b => b.id !== book.id);
          return {
            books: [...otherBooks, book]
          };
        });
      })
      .catch(err => console.error(err));
  };

  /**
   * Query the API with a search value and update the state's search results
   * based on the response.
   * @param {string} value: Search query to send to the API
   */
  handleSearchUpdate = debounce(value => {
    BooksAPI.search(value)
      .then(result => {
        if (Array.isArray(result)) {
          this.setState(currentState => {
            const shelvedBooks = currentState.books;
            // filter out books without a thumbnail
            const books = result.filter(
              book => book.imageLinks && book.imageLinks.thumbnail
            );
            // check if the book is currently on a shelf
            // if so, set that shelf on the book
            books.forEach(book => {
              const shelvedBook = shelvedBooks.find(b => b.id === book.id);
              if (shelvedBook) book.shelf = shelvedBook.shelf;
            });

            return {
              searchResults: books
            };
          });
        } else {
          this.setState(() => ({
            searchResults: []
          }));
        }
      })
      .catch(err => console.error(err));
  }, 100);

  /**
   * Sort books into shelves based on their `shelf` property
   * @param {Array} books: Array of books
   * @returns {Object}: A composite object of all three shelf types. An
   *  individual shelf has a label (string) and an array of the books on that
   *  shelf
   */
  createShelves(books) {
    const shelves = {
      currentlyReading: {
        label: "Currently Reading",
        books: []
      },
      wantToRead: {
        label: "Want to Read",
        books: []
      },
      read: {
        label: "Read",
        books: []
      }
    };

    books.forEach(book => {
      shelves[book.shelf].books.push(book);
    });

    return shelves;
  }

  render() {
    const { books, searchResults } = this.state;
    const shelves = this.createShelves(books);

    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <Search
              handleSearchUpdate={this.handleSearchUpdate}
              books={searchResults}
              moveBook={this.moveBook}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={() => <Home shelves={shelves} moveBook={this.moveBook} />}
        />
      </div>
    );
  }
}

export default BooksApp;
