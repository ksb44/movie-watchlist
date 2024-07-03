// netlify/functions/movies.js
const mongoose = require('mongoose');
const connectDb = require('./connectDb');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  releaseYear: String,
  genre: String,
  watched: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  review: { type: String, default: '' },
});

const Movie = mongoose.model('Movie', movieSchema);

exports.handler = async (event) => {
  await connectDb();

  switch (event.httpMethod) {
    case 'GET':
      if (event.path === '/.netlify/functions/movies') {
        const movies = await Movie.find();
        return {
          statusCode: 200,
          body: JSON.stringify(movies),
        };
      } else {
        const id = event.path.split('/').pop();
        const movie = await Movie.findById(id);
        return {
          statusCode: 200,
          body: JSON.stringify(movie),
        };
      }

    case 'POST':
      const newMovie = new Movie(JSON.parse(event.body));
      await newMovie.save();
      return {
        statusCode: 201,
        body: JSON.stringify(newMovie),
      };

    case 'PUT':
      const updateId = event.path.split('/').pop();
      const updatedMovie = await Movie.findByIdAndUpdate(updateId, JSON.parse(event.body), { new: true });
      return {
        statusCode: 200,
        body: JSON.stringify(updatedMovie),
      };

    case 'DELETE':
      const deleteId = event.path.split('/').pop();
      await Movie.findByIdAndDelete(deleteId);
      return {
        statusCode: 204,
      };

    default:
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
  }
};
