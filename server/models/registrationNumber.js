const mongoose = require('mongoose');

const regNoSchema = new mongoose.Schema({
  reg_no: {
    type: Number,
    required: true,
    unique: true,
  },
});

const RegNo = mongoose.model('RegistrationNumber', regNoSchema);

module.exports = RegNo;
