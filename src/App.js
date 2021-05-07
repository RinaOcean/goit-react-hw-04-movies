import React, { Component } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Switch from 'react-bootstrap/esm/Switch';

class App extends Component {
  // state = {
  //   movies: [],
  // };

  // componentDidMount() {}
  // componentDidUpdate(prevProps, prevState) {

  // }

  render() {
    return (
      <>
        <header className="Header">
          <ul className="NavList">
            <li>
              <NavLink
                exact
                to="/"
                className="NavLink"
                activeClassName="NavLink--active"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className="NavLink"
                activeClassName="NavLink--active"
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </header>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/movies" component={MoviesPage} />
          {/* <Route path="/movies/:movieId" component={MoviesPage} /> */}
          {/* <Route path="/movies/:movieId/cast" component={MoviesPage} /> */}
          {/* <Route path="/movies/:movieId/reviews" component={MoviesPage} /> */}
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
}

export default App;
