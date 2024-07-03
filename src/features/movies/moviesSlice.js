import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  movie: null,
  status: 'idle',
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
    setMovie(state, action) {
      state.movie = action.payload;
    },
    addMovie(state, action) {
      state.movies.push(action.payload);
    },
    updateMovie(state, action) {
      const index = state.movies.findIndex(movie => movie._id === action.payload._id);
      if (index !== -1) {
        state.movies[index] = action.payload;
      }
    },
    deleteMovie(state, action) {
      state.movies = state.movies.filter(movie => movie._id !== action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setMovies, setMovie, addMovie, updateMovie, deleteMovie, setStatus, setError } = moviesSlice.actions;

export default moviesSlice.reducer;
