const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator'); // "validálja, hogy jó-e az adott id"

const BookSchema = mongoose.Schema({
  ISBN: String,
  author: String,
  title: String,
  publisher: String,
  year: Number,
  genre: String,
  member_id: { // Egy itt egy Member entitás _id-ja lesz. 1-n kapcsolat : 1 member-hez több book is tartozhat. (majd a populate tölti fel a megjelenítéskor.)
    type: mongoose.Schema.Types.ObjectId, // Tehát egy olyan _id lesz, ami a Member kollekció dokumentumokra mutat.  de lehet hogy a kölcsönzéseket kellene csak nyilvántartani
    ref: 'Member',
  },
  location: Number,
  active: Boolean
},
  {
    timestamps: true
  },
);
BookSchema.plugin(idValidator);

module.exports = mongoose.model('Book', BookSchema);
// 'Book'-néven ezt a BookSchema-t/adatmodellt expotáljuk ki 
