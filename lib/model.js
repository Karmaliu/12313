const mongoose = require('./db.js');
const id = mongoose.Types.ObjectId();

let userSchema = new mongoose.Schema({
  id: Number,
  email: String,
  phone: String,
  password: String,
});

var User = mongoose.model('user', userSchema, 'user');

module.exports = { User };