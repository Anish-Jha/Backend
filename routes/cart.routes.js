const User = require('../models/User');
const express=require('express');
const Product = require('../models/Product');
const cartRouter=express.Router();
cartRouter.post('/addtocart', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const users = await User.findById({_id:req.body});
    const products = await Product.findById(productId);
    const existingItem = user.cart.find(
      (item) => item.products.toString() === productId
    );

    if (existingItem) {
      res.send({message:'Already added to cart'})
    } else {
      users.cart.push({
        product: products._id,
        quantity: quantity
      });
    }
    await users.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports=cartRouter;
