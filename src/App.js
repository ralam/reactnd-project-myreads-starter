import React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home";
import Search from "./components/Search";
import * as BooksAPI from "./BooksAPI";

// import * as BooksAPI from './BooksAPI'
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {
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
    }
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
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
        this.setState(() => ({
          books: books,
          shelves: shelves
        }));
      })
      .catch(err => console.log(err));
  }

  moveBook = (book, oldShelfName, newShelfName) => {
    this.setState(currentState => {
      const oldShelf = currentState.shelves[oldShelfName];
      const oldShelfBooks = oldShelf.books.filter(
        oldBook => oldBook.id !== book.id
      );
      const newShelf = currentState.shelves[newShelfName];
      return {
        shelves: {
          ...currentState.shelves,
          [oldShelfName]: {
            ...oldShelf,
            books: oldShelfBooks
          },
          [newShelfName]: {
            ...newShelf,
            books: [...newShelf.books, book]
          }
        }
      };
    });
  };

  render() {
    const { books, shelves } = this.state;
    return (
      <div className="app">
        <Route path="/search" render={() => <Search />} />
        <Route
          path="/"
          exact
          render={() => (
            <Home books={books} shelves={shelves} moveBook={this.moveBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
