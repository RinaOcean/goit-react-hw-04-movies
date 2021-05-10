import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import apiMovies from '../../services/universalApiClass';
import MoviesGallery from '../../components/MoviesGallery';

class MoviesPage extends Component {
  static propTypes = {
    inputValue: PropTypes.string,
  };

  state = {
    movies: [],
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.inputValue.trim() === '') {
      toast.warn('Please, enter something');
      return;
    }

    this.onSearchQuery(this.state.inputValue);
    this.props.history.push({
      search: `search=${this.state.inputValue}`,
    });
  };

  async onSearchQuery(query) {
    const movieDetails = await apiMovies.getMoviesByQuery(query);
    this.setState({ movies: movieDetails });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <input
            className="SearchForm-input"
            type="text"
            value={inputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search movies..."
            onChange={this.handleChange}
          />
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
        </form>

        <MoviesGallery request={this.state.movies} />
      </>
    );
  }
}
export default MoviesPage;
