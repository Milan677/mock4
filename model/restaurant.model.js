
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  menu: [menuSchema],
});

const resModel = mongoose.model('Restaurant', restaurantSchema);

module.exports={resModel}
