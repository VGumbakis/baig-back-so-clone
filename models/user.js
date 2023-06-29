const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: { type: String, required: true, min: 3 },
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true, min: 8 },
  password: { type: String, required: true, min: 6 },
  written_answers: { type: Array, required: false },
  likes_get: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model('User', userSchema);
