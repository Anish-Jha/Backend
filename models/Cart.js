const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
