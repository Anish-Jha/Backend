const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
