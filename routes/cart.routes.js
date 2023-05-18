const express = require('express');
const cartRouter = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth.middleware');

// Add a product to the cart
cartRouter.post('/addtocart', auth, async (req, res) => {
  try {
    const { product_id, product, quantity } = req.body;
    const userID = req.body.userID; 

    // Check if the product is already in the user's cart
    const existingItem = await Cart.findOne({ product_id, userID });

    if (existingItem) {
      return res.status(400).json({ message: 'Product already exists in the cart' });
    }
    
    // Create a new cart item
    const cartItem = new Cart({
      product_id,
      product,
      quantity,
      userID,
    });

    await cartItem.save();
    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = cartRouter;
