const express = require('express');
const Cart=require('../models/Cart')
const Product=require('../models/Product');
const auth=require('../middleware/auth.middleware')
const cartRouter = express.Router();

cartRouter.post('/addtocart/', async (req, res) => {
    try {
      const productId = req.body.id;
      const user = req.user;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const cart = await Cart.findOne({ user: user._id, 'products.product': productId });
      if (cart) {
        await Cart.findOneAndUpdate(
          { user: user._id, 'products.product': productId },
          { $inc: { 'products.$.quantity': 1 } }
        );
      } else {
        await Cart.findOneAndUpdate(
          { user: user._id },
          { $push: { products: { product: productId, quantity: 1 } } },
          { upsert: true }
        );
      }
  
      res.status(201).json({ message: 'Added to cart' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  