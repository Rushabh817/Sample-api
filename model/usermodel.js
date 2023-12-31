const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Phone_no: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;