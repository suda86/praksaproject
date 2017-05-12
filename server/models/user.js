const mongoose = require('mongoose');



var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  age: Number,
  gender: String,
  friends: [String],
  request: [String]
});


var User = mongoose.model('User', UserSchema);

module.exports = {User};
