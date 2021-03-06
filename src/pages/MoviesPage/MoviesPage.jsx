import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import queryString from 'query-string';

import apiMovies from '../../services/universalApiClass';

import MoviesGallery from '../../components/MoviesGallery';
import Loader from '../../components/Loader';
import ErrorMarkup from '../../components/ErrorMarkup/ErrorMarkup';

class MoviesPage extends Component {
  static propTypes = {
    inputValue: PropTypes.string,
    movies: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.object,
    loading: PropTypes.bool,
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

  async onSearchQuery(query) {
    try {
      this.setState({ loading: true });

      const movieDetails = await apiMovies.getMoviesByQuery(query);
      if (movieDetails.length > 0) {
        return this.setState({ movies: movieDetails, loading: false });
      }
      toast.warn(`There is no movie named ${query}`);
      this.setState({ inputValue: '', loading: false });
    } catch (error) {
      toast.error('Error occurred. Try later');
      this.setState({ error });
      this.setState({ loading: false });
    }
  }

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

  getQueryFromProps = props => queryString.parse(props.location.search).search;

  componentDidMount() {
    const currentQuery = this.getQueryFromProps(this.props);
    if (typeof currentQuery === 'undefined') {
      return this.setState({ inputValue: '' });
    }
    this.onSearchQuery(currentQuery);
    this.setState({ inputValue: currentQuery });
  }

  componentDidUpdate(prevProps) {
    const prevQuery = this.getQueryFromProps(prevProps);
    const nextQuery = this.getQueryFromProps(this.props);

    if (prevQuery !== nextQuery) {
      if (typeof nextQuery === 'undefined') {
        return this.setState({ inputValue: '' });
      }
      this.onSearchQuery(nextQuery);
      this.setState({ inputValue: nextQuery });
      return;
    }
  }
  // componentWillUnmount() {
  //   this.setState({ inputValue: '' });
  //   this.props.history.push({
  //     search: '',
  //   });
  // }

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
        {this.state.inputValue !== '' ? (
          <MoviesGallery request={this.state.movies} />
        ) : null}
      </>
    );
  }
}
export default MoviesPage;
