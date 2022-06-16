const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const BorrowSchema = mongoose.Schema({
  date: Date, // a timestamps-ből???
  member_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Member',
  },
  book_ids: [ 
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

BorrowSchema.plugin(idValidator);

module.exports = mongoose.model('Borrow', BorrowSchema);
