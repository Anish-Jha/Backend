const express = require('express');
const Order = require('../models/Order');
const admin=require('../middleware/admin.middleware')
const auth=require('../middleware/auth.middleware')
const orderRouter = express.Router();

orderRouter.get('/orders',admin,async(req,res)=>{
  try{
      const orders=await Order.find();
      res.status(200).send(orders);
  }catch(err){
      res.status(500).send({message:'Unable to process the request at the moment'})
  }
})

orderRouter.get('/orderlist',auth,async(req,res)=>{
  try{
      const orders=await Order.find();
      res.status(200).send(orders);
  }catch(err){
      res.status(500).send({message:'Unable to process the request at the moment'})
  }
})

orderRouter.get('/orders/:userID',auth, async (req, res) => {
  try {
    const userID = req.params.userID;
    const orders = await Order.find({userID});
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = orderRouter;
