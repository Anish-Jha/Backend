const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    index: true, // Add index for faster lookup
  },
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
    index: true, // Add index for faster lookup
  },
});

// Add a unique index on product_id and userID
cartSchema.index({ product_id: 1, userID: 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
