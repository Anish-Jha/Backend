const express = require('express');
const cartRouter = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth.middleware');
const Order = require('../models/Order');
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

cartRouter.get('/getcart', auth, async (req, res) => {
  try {
    const userID = req.body.userID;
    const cartItems = await Cart.find({ userID });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

cartRouter.delete('/removefromcart/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const userID = req.body.userID;
    await Cart.findOneAndDelete({ _id: id, userID });
    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

cartRouter.patch('/updatecart/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const userID = req.body.userID;
    const { quantity } = req.body;
    const cartItem = await Cart.findOneAndUpdate(
      { _id: id, userID },
      { quantity }
    );
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json({ message: 'Cart item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

cartRouter.delete('/emptycart/:userId', auth, async (req, res) => {
  try {
    const userID = req.body.userID;
    const cartItems = await Cart.find({ userID: userID });
    const orders = cartItems.map((cartItem) => ({
      product: cartItem.product,
      quantity: cartItem.quantity,
      userID: cartItem.userID,
    }));

    await Order.insertMany(orders);
    await Cart.deleteMany({ userID: userID });

    res.status(200).json({ message: 'Cart emptied successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = cartRouter;
