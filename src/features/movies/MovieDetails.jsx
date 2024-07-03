import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteMovie, toggleWatched, updateRating, updateReview } from './moviesActions';

const MovieDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const movie = useSelector((state) =>
    state.movies.movies.find((movie) => movie._id === id)
  );

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  const handleDelete = () => {
    dispatch(deleteMovie(id));
    history.push('/');
  };

  const handleToggleWatched = () => {
    dispatch(toggleWatched(id, !movie.watched));
  };

  const handleRatingChange = (e) => {
    dispatch(updateRating(id, parseInt(e.target.value)));
  };

  const handleReviewChange = (e) => {
    dispatch(updateReview(id, e.target.value));
  };

  return (
    <div>
      <h2>{movie.title}</h2>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Watch Status:</strong> {movie.watched ? 'Watched' : 'Unwatched'}</p>
      <div className="form-group">
        <label><strong>Rating:</strong></label>
        <input
          type="number"
          value={movie.rating}
          onChange={handleRatingChange}
          min="1"
          max="5"
        />
      </div>
      <div className="form-group">
        <label><strong>Review:</strong></label>
        <textarea
          value={movie.review}
          onChange={handleReviewChange}
        ></textarea>
      </div>
      <button onClick={handleToggleWatched}>
        {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
      </button>
      <button onClick={() => history.push(`/edit/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => history.push('/')}>Back to List</button>
    </div>
  );
};

export default MovieDetails;
