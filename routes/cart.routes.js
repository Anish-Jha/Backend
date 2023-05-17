const express = require('express');
const cartRouter = express.Router();
const Cart = require('../models/Cart');
const auth=require('../middleware/auth.middleware')
// Add a product to the cart
cartRouter.post('/addtocart',auth, async (req, res) => {
    try {
      const { userID, productId, quantity } = req.body;
  
      // Find the cart for the user or create a new one
      const carts = await Cart.findOneAndUpdate(
        { userID },
        { $setOnInsert: { userID, items: [] } },
        { upsert: true, new: true }
      );
  
      // Check if the product is already in the cart
      const existingItemIndex = carts.items.findIndex((item) => item.productId === productId);
  
      if (existingItemIndex > -1) {
        // Update the quantity and total of the existing item
        carts.items[existingItemIndex].quantity += quantity;
        carts.items[existingItemIndex].total += total;
      } else {
        // Add the new item to the cart
        carts.items.push({ productId, quantity, price, total });
      }
  
      await carts.save();
      res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  



module.exports = cartRouter;
