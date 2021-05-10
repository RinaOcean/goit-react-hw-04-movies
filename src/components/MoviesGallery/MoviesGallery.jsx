import PropTypes from 'prop-types';

import MovieCard from '../../components/MovieCard/MovieCard';

const MoviesGallery = ({ request }) => (
  <ul className="MoviesGallery">
    {request.map(({ poster_path, id, title }) => (
      <li key={id} className="MoviesGalleryItem">
        <MovieCard id={id} poster_path={poster_path} title={title} />
      </li>
    ))}
  </ul>
);

MoviesGallery.propTypes = {
  request: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string,
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  ),
};

export default MoviesGallery;
