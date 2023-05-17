const express = require('express');
const cartRouter = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

// Add a product to the cart
cartRouter.post('/addtocart',auth, async (req, res) => {
  try {
    const { userID, productId, quantity } = req.body;

    // Find the user
    const user = await User.findById(userID).populate('cart');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let cart = user.cart;

    // If the user doesn't have a cart, create a new one
    if (!cart) {
      cart = new Cart({ userID, items: [] });
      await cart.save();
      user.cart = cart;
      await user.save();
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find((item) => item.productId.equals(productId));

    if (existingItem) {
      // Update the quantity of the existing item
      existingItem.quantity += quantity;
    } else {
      // Add the new item to the cart
      cart.items.push({ productId, quantity });
    }

    // Save the changes to the cart
    await cart.save();

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = cartRouter;

