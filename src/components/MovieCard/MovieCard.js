import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import apiSettings from '../../services/apiSettings';
import './MovieCard.scss';

const { POSTER_URL, NOPOSTER_URL } = apiSettings;

const MovieCard = ({ poster_path, id, title, location }) => {
  let imgUrl = NOPOSTER_URL;
  if (poster_path !== null) {
    imgUrl = `${POSTER_URL}${poster_path}`;
  }
  return (
    <Link
      to={{
        pathname: `/movies/${id}`,
        state: {
          from: location,
        },
      }}
      className="Link"
    >
      <div className="MoviesGalleryItem-image--thumb">
        <img src={imgUrl} alt={title} className="MoviesGalleryItem-image" />
      </div>
      <div className="MoviesGalleryItem-title">
        <span>{title}</span>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  poster_path: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string,
};

export default withRouter(MovieCard);
