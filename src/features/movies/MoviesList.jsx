import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from './moviesActions';
import MovieItem from './MovieItem';

const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies());
    }
  }, [movieStatus, dispatch]);

  let content;

  if (movieStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (movieStatus === 'succeeded') {
    if (movies.length === 0) {
      content = <p>No movies found.</p>;
      } else {
    content = movies.map((movie) => <MovieItem key={movie._id} movie={movie} />);
      }
  } else if (movieStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2 style={{textAlign:'center'}}> </h2>
      {content}
    </div>
  );
};

export default MoviesList;
