// const MovieInfo = () => (
//   <>
//     {' '}
//     <div className="MovieDetailsWrapper">
//       <img
//         src={poster_path !== null ? imgUrl : NOPOSTER_URL}
//         alt=""
//         className="MoviePoster"
//       />
//       <div className="MovieInfo">
//         <h1>{title}</h1>
//         <span>Release date: {release_date}</span>
//         <span className="Rating">{`Users rating: ${ratingPercentage}%`}</span>
//         <h2 className="Overview">Overview</h2>
//         <span className="OverviewText">{overview}</span>
//         <h3 className="Genres">Genres</h3>
//         <span>{allGenres}</span>
//       </div>
//     </div>
//     <ul className="AdditionalInfo">
//       <h2>Additional info</h2>
//       <li>
//         <NavLink
//           to={{
//             pathname: `${this.props.match.url}/cast`,
//             state: {
//               from: this.props.location,
//             },
//           }}
//           className="NavLinkDetails"
//           activeClassName="NavLinkDetails--active"
//         >
//           Cast
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to={{
//             pathname: `${this.props.match.url}/reviews`,
//             state: {
//               from: this.props.location,
//             },
//           }}
//           className="NavLinkDetails"
//           activeClassName="NavLinkDetails--active"
//         >
//           Reviews
//         </NavLink>
//       </li>
//       <Route path={`${this.props.match.path}/cast`} component={Cast} />
//       <Route path={`${this.props.match.path}/reviews`} component={Reviews} />
//     </ul>
//   </>
// );
