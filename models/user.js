const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, minlength: 2, unique: true },
  password: { type: String, required: true, minlength: 2 },
},
{
  timestamps: true
});


const User = mongoose.model('User', UserSchema);

module.exports = User;