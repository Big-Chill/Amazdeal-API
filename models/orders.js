const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  product_id: { type: String, required: true, minlength: 2 },
  user_id: { type: String, required: true, minlength: 2 },
  uploadedBy: { type: String, required: true, minlength: 2 },
  stock: { type: Number, required: true, minlength: 2 },
  quantity: { type: Number, required: true, minlength: 2 },
  price: { type: Number, required: true, minlength: 2 },
  name: { type: String, required: true, minlength: 2 },
  mrp: { type: Number, required: true, minlength: 2 },
  filePath: { type: String, required: true, minlength: 2 },
  description: { type: String, required: true, minlength: 2 },
  category: { type: String, required: true, minlength: 2 },
  brand: { type: String, required: true, minlength: 2 }
});


const OrderSchema = new Schema({
  user_id: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, minlength: 2 },
  items: [ItemSchema],
  total: { type: Number, required: true, minlength: 2 },
  dateOfOrder: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;