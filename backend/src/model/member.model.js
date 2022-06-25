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
  active: Boolean
},
  {
    timestamps: true
  },
);

module.exports = mongoose.model('Member', MemberSchema);
