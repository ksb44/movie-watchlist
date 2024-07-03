const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.get('/movies/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

app.post('/movies', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

app.put('/movies/:id', async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
});

app.delete('/movies/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete movie' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
