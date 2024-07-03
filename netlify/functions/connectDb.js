
const mongoose = require('mongoose');

let isConnected = false;

module.exports = async () => {
  if (isConnected) return;

  await mongoose.connect('mongodb+srv://12as1913162:12as1913162@cluster0.yjsjhqe.mongodb.net/movie_watchlist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
};
