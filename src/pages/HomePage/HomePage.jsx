import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import apiMovies from '../../services/universalApiClass';
import MoviesGallery from '../../components/MoviesGallery';
import ErrorMarkup from '../../components/ErrorMarkup/ErrorMarkup';

class HomePage extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    popularMovies: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.object,
  };

  state = {
    loading: false,
    popularMovies: [],
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });

      const movies = await apiMovies.getTrending();
      this.setState({ popularMovies: movies, loading: false });
    } catch (error) {
      toast.error('Error occurred. Try later');
      this.setState({ error });
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, error } = this.state;
    return (
      <>
        {loading && <Loader />}
        {error && <ErrorMarkup />}
        <MoviesGallery request={this.state.popularMovies} />
      </>
    );
  }
}

export default HomePage;
