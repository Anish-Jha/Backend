const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema]
});

cartSchema.methods.addItem = async function(product, quantity = 1) {
  try {
    const cartItem = this.items.find(item => item.product.toString() === product._id.toString());
    if (cartItem) {
      cartItem.quantity += quantity;
      await this.save();
      return cartItem;
    } else {
      const newCartItem = { product: product._id, quantity: quantity };
      this.items.push(newCartItem);
      await this.save();
      return newCartItem;
    }
  } catch (error) {
    throw error;
  }
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
