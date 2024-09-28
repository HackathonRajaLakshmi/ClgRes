const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Ug', 'faculty', 'Pg'],
    required: true,
  },
  reg_no: {
    type: String,
    required: true,
    unique: true,
  },
  dept: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

module.exports = mongoose.model('User', userSchema);