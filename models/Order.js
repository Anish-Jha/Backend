const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  product: {
    image: String,
    subhead: String,
    name: String,
    price: Number,
    category: String,
    description: String,
    discount: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  userID: {
    type: String,
    required: true,
    index: true, 
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
