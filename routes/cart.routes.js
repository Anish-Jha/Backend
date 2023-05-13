const User = require('../models/User');
const express=require('express');
const Product = require('../models/Product');
const cartRouter=express.Router();
cartRouter.post('/addtocart', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById({_id:req.body.userID});
    const product = await Product.findById(productId);
    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      res.send({message:'Already added to cart'})
    } else {
      user.cart.push({
        product: product._id,
        quantity: quantity
      });
    }
    await user.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports=cartRouter;
