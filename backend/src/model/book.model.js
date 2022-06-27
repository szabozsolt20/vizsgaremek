const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  ISBN: String,
  author: String,
  title: String,
  publisher: String,
  year: Number,
  genre: String,
  location: Number,
  active: Boolean
},
  {
    timestamps: true
  },
);

module.exports = mongoose.model('Book', BookSchema);
// 'Book'-néven ezt a BookSchema-t/adatmodellt expotáljuk ki 
