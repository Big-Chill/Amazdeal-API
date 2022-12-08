const mongoose = require('mongoose');
const { Schema } = mongoose;

const PeopleSchema = new Schema({
  firstName: { type: String, required: true, minlength: 2},
  lastName: { type: String, required: true, minlength: 2},
  age: { type: Number, required: true, min: 1, max: 150 }
});

const People = mongoose.model('People', PeopleSchema);

module.exports = People;

