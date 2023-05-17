const express = require('express');
const cartRouter = express.Router();
const Cart = require('../models/Cart');

// Add a product to the cart
cartRouter.post('/addtocart', async (req, res) => {
  try {
    const { userId, productId, quantity, price, total } = req.body;

    // Find the cart for the user
    let carts = await Cart.findOne({ userId });

    // If the cart doesn't exist, create a new one
    if (!carts) {
      carts = new Cart({
        userId,
        items: [],
      });
    }

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

// Get the cart for a specific user
cartRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove a product from the cart
cartRouter.delete('/:userId/items/:itemId', async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update the quantity of a product in the cart
cartRouter.put('/:userId/items/:itemId', async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart
    const item = cart.items.find((item) => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update the quantity
    item.quantity = quantity;
    item.total = item.price * quantity;

    await cart.save();

    res.status(200).json({ message: 'Cart item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = cartRouter;
