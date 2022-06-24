const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const BorrowSchema = mongoose.Schema({
  date: {
    type: Number, // a timestamps-ből??? 
    require: true
  },
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

// BorrowSchema.plugin(idValidator); próba adatokkal még nem

module.exports = mongoose.model('Borrow', BorrowSchema);
