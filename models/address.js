const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
  country: { type: String, required: true, minlength: 2 },
  fullName: { type: String, required: true, minlength: 2 },
  mobileNumber: { type: String, required: true, minlength: 2 },
  pincode: { type: String, required: true, minlength: 2 },
  address_line_1: { type: String, required: true, minlength: 2 },
  address_line_2: { type: String, required: true, minlength: 2 },
  landmark: { type: String, required: true, minlength: 2 },
  city: { type: String, required: true, minlength: 2 },
  state: { type: String, required: true, minlength: 2 },
  is_default_address: { type: Boolean, required: true, default: false },
  address_type: { type: String, required: true, minlength: 2 },
  user_id: { type: String, required: true, minlength: 2 },
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;