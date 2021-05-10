import { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import apiMovies from '../../services/universalApiClass';
import apiSettings from '../../services/apiSettings';
import Container from '../../components/Container';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const { POSTER_URL, NOPOSTER_URL } = apiSettings;

class MovieDetailsPage extends Component {
  state = {
    title: '',
    poster_path: '',
    release_date: '',
    vote_average: null,
    overview: '',
    genres: [],
  };

  async componentDidMount() {
    const movieDetails = await apiMovies.getMovieDetails(
      this.props.match.params.movieId,
    );

    this.setState({ ...movieDetails });
  }

  render() {
    const {
      title,
      poster_path,
      release_date,
      vote_average,
      overview,
      genres,
    } = this.state;

    const imgUrl = `${POSTER_URL}${poster_path}`;
    const ratingPercentage = vote_average * 10;
    const allGenres = genres.map(genre => genre.name).join(', ');

    return (
      <Container className="Container">
        <button className="GoBackBtn">
          <ArrowBackIosIcon />
          back
        </button>

        <div className="MovieDetailsWrapper">
          <img
            src={poster_path !== null ? imgUrl : NOPOSTER_URL}
            alt=""
            className="MoviePoster"
          />
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
                  from: this.props.location,
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
                  from: this.props.location,
                },
              }}
              className="NavLinkDetails"
              activeClassName="NavLinkDetails--active"
            >
              Reviews
            </NavLink>
          </li>
          <Route path={`${this.props.match.path}/cast`} component={Cast} />
          <Route
            path={`${this.props.match.path}/reviews`}
            component={Reviews}
          />
        </ul>
      </Container>
    );
  }
}
export default MovieDetailsPage;
