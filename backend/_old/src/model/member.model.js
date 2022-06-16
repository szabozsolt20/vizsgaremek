const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const MemberSchema = mongoose.Schema({
  name: String,
  uid: Number,
  mother: String,
  birthplace: String,
  birthdate: String, // Date???
  address: String,
  email: String,
  phone: String,
  book_ids: [ // a book-ok _id-jai tömbben, amit a Books kollekcióhoz kötünk, abban keressük ezeket az id-kat, de lehet hogy a kölcsönzéseket kellene csak nyilvántartani
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    }
  ],
  active: Boolean
},
  {
    timestamps: true
  },
);

MemberSchema.plugin(idValidator);

module.exports = mongoose.model('Member', MemberSchema);
