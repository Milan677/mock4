
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
});


const userModel = mongoose.model('User', userSchema);

module.exports={userModel}
