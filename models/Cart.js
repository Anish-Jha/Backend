const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
    default: 1,
  },
  userID: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
