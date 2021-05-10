import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import apiMovies from '../../services/universalApiClass';
import './Reviews.scss';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const reviewsDetails = await apiMovies.getReviews(
      this.props.match.params.movieId,
    );

    this.setState({ reviews: reviewsDetails });
  }

  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  render() {
    const { reviews } = this.state;

    return (
      <ul className="ReviewsList">
        {reviews.length === 0 ? (
          <span>No reviews yet.</span>
        ) : (
          reviews.map(review => {
            return (
              <li key={review.id} className="ReviewsListItem">
                <span className="ReviewsListItemName">{review.author}</span>
                <ShowMoreText
                  /* Default options */
                  lines={3}
                  more="Show more"
                  less="Show less"
                  className="content-css"
                  anchorClass="my-anchor-css-class"
                  onClick={this.executeOnClick}
                  expanded={false}
                  width={400}
                >
                  {review.content}
                </ShowMoreText>
              </li>
            );
          })
        )}
      </ul>
    );
  }
}
export default withRouter(Reviews);
