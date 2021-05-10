import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import apiMovies from '../../services/universalApiClass';
import apiSettings from '../../services/apiSettings';

import './Cast.scss';

const { POSTER_URL, NOPHOTO_URL } = apiSettings;

class Cast extends Component {
  static propTypes = {
    cast: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        profile_path: PropTypes.string,
        name: PropTypes.string,
        character: PropTypes.string,
      }),
    ),
  };

  state = {
    cast: [],
  };

  async componentDidMount() {
    const castDetails = await apiMovies.getCast(
      this.props.match.params.movieId,
    );

    this.setState({ cast: castDetails });
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  render() {
    const { cast } = this.state;

    return (
      <ul className="CastList">
        {cast.map(actor => {
          const imgUrl = `${POSTER_URL}${actor.profile_path}`;
          return (
            <li key={actor.id} className="CastListItem">
              <img
                src={actor.profile_path !== null ? imgUrl : NOPHOTO_URL}
                alt={actor.name}
              />
              <div className="CastListItemText">
                <span className="CastListItemName">{actor.name}</span>
                {actor.character && <span>as {actor.character}</span>}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default withRouter(Cast);
