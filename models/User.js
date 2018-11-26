const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: {
    type: String,
    required: true
  }
});

const User = mongoose.model('user', userSchema);

exports.User = User;