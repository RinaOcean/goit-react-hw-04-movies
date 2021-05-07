import { Component } from 'react';
import ApiMovies from '../../services/api';
const apiMovies = new ApiMovies();

class HomePage extends Component {
  state = {
    popularMovies: [],
  };

  async componentDidMount() {
    const movies = await apiMovies.getTrending();
    console.log(movies);
    this.setState({ popularMovies: movies });
  }

  render() {
    return (
      <>
        <h1>Today's trending</h1>
        <ul>
          {this.state.popularMovies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomePage;
