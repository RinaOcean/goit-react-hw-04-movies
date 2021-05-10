import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import queryString from 'query-string';

import apiMovies from '../../services/universalApiClass';
import routes from '../../routes';
import MoviesGallery from '../../components/MoviesGallery';
import Loader from '../../components/Loader';
import ErrorMarkup from '../../components/ErrorMarkup/ErrorMarkup';

class MoviesPage extends Component {
  static propTypes = {
    inputValue: PropTypes.string,
    movies: PropTypes.arrayOf(PropTypes.object),
  };

  state = {
    loading: false,
    error: null,
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
      // pathname: this.props.location.pathname,
      search: `search=${this.state.inputValue}`,
    });
  };

  async onSearchQuery(query) {
    try {
      this.setState({ loading: true });

      const movieDetails = await apiMovies.getMoviesByQuery(query);
      this.setState({ movies: movieDetails, loading: false });
    } catch (error) {
      toast.error('Error occurred. Try later');
      this.setState({ error });
      this.setState({ loading: false });
    }
  }

  getQueryFromProps = props => queryString.parse(props.location.search).search;
  componentDidUpdate(prevProps) {
    const prevQuery = this.getQueryFromProps(prevProps);
    const nextQuery = this.getQueryFromProps(this.props);

    if (prevQuery !== nextQuery) {
      if (typeof nextQuery === 'undefined') {
        return this.props.history.push(routes.home);
      }
      this.onSearchQuery(nextQuery);
      this.setState({ inputValue: nextQuery });
    }
  }
  componentWillUnmount() {
    this.setState({ inputValue: '' });
    this.props.history.push({
      search: '',
    });
  }

  render() {
    const { inputValue, loading, error } = this.state;

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
        {loading && <Loader />}
        {error && <ErrorMarkup />}
        <MoviesGallery request={this.state.movies} />
      </>
    );
  }
}
export default MoviesPage;
