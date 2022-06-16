const mongoose = require('mongoose');

const LibrarianSchema = mongoose.Schema({
  name: String,
  username: String, // user, editor, admin
  location: Number,
  role: Number, // 1,2,3
  phone: Number,
  active: Boolean
},
  {
    timestamps: true
  },
);

module.exports = mongoose.model('Librarian', LibrarianSchema);
