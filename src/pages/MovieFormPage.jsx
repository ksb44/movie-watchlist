import React from 'react';
import { useParams } from 'react-router-dom';
import MovieForm from '../features/movies/MovieForm';

const MovieFormPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2 style={{textAlign:'center'}}>{id ? 'Edit Movie' : 'Add New Movie'}</h2>
      <MovieForm />
    </div>
  );
};

export default MovieFormPage;
