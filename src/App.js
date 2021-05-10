import React, { Component, Suspense, lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppBar from './components/AppBar';
import Loader from './components/Loader';
// import HomePage from './pages/HomePage';
// import MoviesPage from './pages/MoviesPage';
// import MovieDetailsPage from './pages/MovieDetailsPage';
// import Cast from './components/Cast';

import routes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "movies-page" */),
);

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
        <AppBar />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route path={routes.movieDetails} component={MovieDetailsPage} />
            <Route path={routes.movies} component={MoviesPage} />
            {/* <Route path={routes.cast} component={Cast} /> */}
            {/* <Route path="/movies/:movieId/reviews" component={Reviews} /> */}
            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
        <ToastContainer />
      </>
    );
  }
}

export default App;
