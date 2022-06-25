const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator'); // "validálja, hogy jó-e az adott id"

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
