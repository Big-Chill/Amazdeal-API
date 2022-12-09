const mongoose = require('mongoose');
const { Schema } = mongoose;

const SellerSchema = new Schema({
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, minlength: 2, unique: true },
  shopAddress: { type: String, required: true, minlength: 2 },
  shopName: { type: String, required: true, minlength: 2 },
  user_id: { type: String, required: true, minlength: 2 },
});

const Seller = mongoose.model('Seller', SellerSchema);

module.exports = Seller;

