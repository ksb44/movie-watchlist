import React from 'react';
import { Link } from 'react-router-dom';
import MoviesList from '../features/movies/MoviesList';


const HomePage = () => {
  return (
   <>
      <h2 className='main'>Movies Watchlist</h2>
      <div className='movie-list'>
      <MoviesList />

    
    </div>
    <div className='add-movie'>
    <Link to="/movies/add"><button >Add New Movie</button></Link>
    </div>
    </>
  );
};

export default HomePage;
