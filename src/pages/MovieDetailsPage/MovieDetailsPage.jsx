import React, { Component, Suspense, lazy } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import apiMovies from '../../services/universalApiClass';
import apiSettings from '../../services/apiSettings';
import Container from '../../components/Container';
// import Cast from '../../components/Cast';
// import Reviews from '../../components/Reviews';
import routs from '../../routes';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Loader from '../../components/Loader';

const { POSTER_URL, NOPOSTER_URL } = apiSettings;

const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "cast-page" */),
);

const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "reviews-page" */),
);

class MovieDetailsPage extends Component {
  static propTypes = {
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.object),
  };

  state = {
    title: '',
    poster_path: null,
    release_date: '',
    vote_average: null,
    overview: '',
    genres: [],
  };

  async componentDidMount() {
    const movieDetails = await apiMovies.getMovieDetails(
      this.props.match.params.movieId,
    );
    // console.log(this.props.location.state.from.pathname);

    this.setState({ ...movieDetails });
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push(routs.home);

    // новый метод. Оператор опциональной последовательности
    //  history.push(location?.state?.from || routs.home)
  };

  render() {
    const {
      title,
      poster_path,
      release_date,
      vote_average,
      overview,
      genres,
    } = this.state;

    let imgUrl = NOPOSTER_URL;
    if (poster_path !== null) {
      imgUrl = `${POSTER_URL}${poster_path}`;
    }
    const ratingPercentage = vote_average * 10;
    const allGenres = genres.map(genre => genre.name).join(', ');

    return (
      <Container className="Container">
        <button className="GoBackBtn" onClick={this.handleGoBack}>
          <ArrowBackIosIcon />
          back
        </button>

        <div className="MovieDetailsWrapper">
          <img src={imgUrl} alt="" className="MoviePoster" />

          <div className="MovieInfo">
            <h1>{title}</h1>
            <span>Release date: {release_date}</span>
            <span className="Rating">{`Users rating: ${ratingPercentage}%`}</span>
            <h2 className="Overview">Overview</h2>
            <span className="OverviewText">{overview}</span>
            <h3 className="Genres">Genres</h3>
            <span>{allGenres}</span>
          </div>
        </div>
        <ul className="AdditionalInfo">
          <h2>Additional info</h2>
          <li>
            <NavLink
              to={{
                pathname: `${this.props.match.url}/cast`,
                state: {
                  from: this.props.location.state.from,
                },
              }}
              className="NavLinkDetails"
              activeClassName="NavLinkDetails--active"
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: `${this.props.match.url}/reviews`,
                state: {
                  from: this.props.location.state.from,
                },
              }}
              className="NavLinkDetails"
              activeClassName="NavLinkDetails--active"
            >
              Reviews
            </NavLink>
          </li>
          <Suspense fallback={<Loader />}>
            <Route path={`${this.props.match.path}/cast`} component={Cast} />
            <Route
              path={`${this.props.match.path}/reviews`}
              component={Reviews}
            />
          </Suspense>
        </ul>
      </Container>
    );
  }
}
export default withRouter(MovieDetailsPage);
