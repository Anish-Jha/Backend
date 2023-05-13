const express = require('express');
const Order = require('../models/Order');

const orderRouter = express.Router();

// Get all orders for a user
orderRouter.get('/orders',auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: 'Unable to process the request at the moment.' });
  }
});

// Add a new order
orderRouter.post('/orders',auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const order = new Order({
      userId: req.user._id,
      productId,
      quantity,
    });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send({ message: 'Unable to process the request at the moment.' });
  }
});

// Delete an order
orderRouter.delete('/orders/:id',auth, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!order) {
      return res.status(404).send({ message: 'Order not found.' });
    }
    res.status(200).send({ message: 'Order deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Unable to process the request at the moment.' });
  }
});

module.exports = orderRouter;
