import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteExistingMovie, updateExistingMovie } from './moviesActions';

const MovieItem = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteExistingMovie(movie._id));
  };

  const handleToggleWatched = () => {
    dispatch(updateExistingMovie({ ...movie, watched: !movie.watched }));
  };

  const handleEdit = () => {
    navigate(`/edit/${movie._id}`);
  };

  return (
   <>
     
      <div className="movie-item">
      <h3  className='title'>Title: {movie.title}</h3>
      <p>Description: {movie.description}</p>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Genre: {movie.genre}</p>
      <p>Rating: {movie.rating}</p>
      <p>Review: {movie.review}</p>
      <p>Watched: {movie.watched ? 'Yes' : 'No'}</p>
      <div className='btn'>
      <button onClick={handleToggleWatched}>
        {movie.watched ? 'Want to watch' : 'Already watched'}
      </button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
    </>
  );
};

export default MovieItem;
