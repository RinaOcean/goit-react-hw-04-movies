import { Component } from 'react';
import ApiMovies from '../../services/api';
const apiMovies = new ApiMovies();

const POSTER_URL = 'https://image.tmdb.org/t/p/w400';

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
        {/* <h1>Today's trending</h1> */}
        <ul className="ImageGallery">
          {this.state.popularMovies.map(movie => {
            const imgUrl = `${POSTER_URL}${movie.poster_path}`;
            console.log(imgUrl);
            return (
              <li key={movie.id} className="ImageGalleryItem">
                <img src={imgUrl} className="ImageGalleryItem-image" />
                <div className="ImageGalleryItem-title">{movie.title}</div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default HomePage;
