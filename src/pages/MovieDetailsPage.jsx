import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const movie = useSelector((state) =>
    state.movies.movies.find((movie) => movie._id === id)
  );

  if (!movie) return <p>Movie not found!</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Description: {movie.description}</p>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Genre: {movie.genre}</p>
      <p>Watched: {movie.watched ? 'Yes' : 'No'}</p>
      <p>Rating: {movie.rating}</p>
      <p>Review: {movie.review}</p>
      <Link to={`/movies/edit/${movie._id}`}>Edit</Link>
      <button>Delete</button>
    </div>
  );
};

export default MovieDetailsPage;
