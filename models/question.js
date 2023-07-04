const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  id: { type: String, required: true, min: 3 },
  title: { type: String, required: true, min: 3 },
  content: { type: String, required: true, min: 8 },
});

module.exports = mongoose.model('Question', questionSchema);
