const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
