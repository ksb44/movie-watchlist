
const mongoose = require('mongoose');

let isConnected = false;

module.exports = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
};
