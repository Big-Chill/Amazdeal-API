const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductImagesSchema = new Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  uploadedBy: { type: String, required: true },
  user_id: { type: String, required: true },
});

const ProductImages = mongoose.model('ProductImages', ProductImagesSchema);

module.exports = ProductImages;