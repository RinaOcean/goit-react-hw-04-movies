import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import apiMovies from '../../services/universalApiClass';
import apiSettings from '../../services/apiSettings';

import './Cast.scss';

const { POSTER_URL, NOPHOTO_URL } = apiSettings;

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const castDetails = await apiMovies.getCast(
      this.props.match.params.movieId,
    );

    this.setState({ cast: castDetails });
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
