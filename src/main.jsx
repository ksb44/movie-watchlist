import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import HomePage from './pages/HomePage';
import MovieFormPage from './pages/MovieFormPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import './App.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/add" element={<MovieFormPage />} />
          <Route path="/edit/:id" element={<MovieFormPage />} />
          <Route path="/details/:id" element={<MovieDetailsPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
