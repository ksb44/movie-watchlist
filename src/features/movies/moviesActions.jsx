import { setMovies, addMovie, updateMovie, deleteMovie, setStatus, setError } from './moviesSlice';

// const API_URL = 'http://localhost:5000/movies';
const API_URL = '/.netlify/functions/movies'
export const fetchMovies = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    dispatch(setMovies(data));
    dispatch(setStatus('succeeded'));
  } catch (err) {
    dispatch(setError(err.message));
    dispatch(setStatus('failed'));
  }
};

export const fetchMovie = (id) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    dispatch(setMovie(data));
    dispatch(setStatus('succeeded'));
  } catch (err) {
    dispatch(setError(err.message));
    dispatch(setStatus('failed'));
  }
};

export const addNewMovie = (movie) => async (dispatch) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    const data = await response.json();
    dispatch(addMovie(data));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const updateExistingMovie = (movie) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${movie._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    const data = await response.json();
    dispatch(updateMovie(data));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const deleteExistingMovie = (movieId) => async (dispatch) => {
  try {
    await fetch(`${API_URL}/${movieId}`, {
      method: 'DELETE',
    });
    dispatch(deleteMovie(movieId));
  } catch (err) {
    dispatch(setError(err.message));
  }
};
