import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addNewMovie, fetchMovie, updateExistingMovie } from './moviesActions';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = useSelector((state) =>
    id ? state.movies.movies.find((movie) => movie._id === id) : null
  );

  useEffect(() => {
    if (id && movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setReleaseYear(movie.releaseYear);
      setGenre(movie.genre);
      setRating(movie.rating);
      setReview(movie.review);
    } else if (id && !movie) {
      dispatch(fetchMovie(id));
    }
  }, [id, movie, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = { title, description, releaseYear, genre, rating, review };

    if (id) {
      dispatch(updateExistingMovie({ ...newMovie, _id: id }));
    } else {
      dispatch(addNewMovie(newMovie));
    }

    navigate('/'); 
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setReleaseYear('');
    setGenre('');
    setRating('');
    setReview('');
    navigate(-1); 
  };

  return (
    <>
    <div className="movie-form">
    <form onSubmit={handleSubmit} className='movie-form-inside' >
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>
      <label>
        Release Year:
        <input
          type="text"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
      </label>
      <label>
        Genre:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </label>
      <label>
        Rating:
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
        />
      </label>
      <label>
        Review:
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </label>
      <div className="form-buttons">
        <button type="submit">{id ? 'Update Movie' : 'Add Movie'}</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
    </div>
    </>
  );
};

export default MovieForm;
