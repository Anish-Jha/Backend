const express = require('express');
const cartRouter = express.Router();
const Cart = require('../models/Cart');

// Add a product to the cart
cartRouter.post('/addtocart',auth, async (req, res) => {
  try {
      const carts=new Cart({
        product_id:req.body._id,
        price:req.body.price,
        userID:req.body.userID
      })
    
      await carts.save();
    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = cartRouter;

