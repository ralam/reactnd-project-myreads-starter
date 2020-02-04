import React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home";
import Search from "./components/Search";

// import * as BooksAPI from './BooksAPI'
import "./App.css";

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <Search />} />
        <Route path="/" exact render={() => <Home />} />
      </div>
    );
  }
}

export default BooksApp;
