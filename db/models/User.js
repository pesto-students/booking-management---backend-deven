const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  role: {
    type: String,
    required: true,
  }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
