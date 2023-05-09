const User = require('../models/User');
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userRouter=express.Router()

userRouter.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).send({ msg: "User already exista, please login to continue" });
    }
    bcrypt.hash(password, 3, async (err, hash) => {
      const newUser = new User({
        name,
        email,
        password: hash,
        phone,
      });
      await newUser.save();
      res.status(201).send({ msg: "Registration Successfull" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password,(err,result) => {
      if (result) {
        res.status(201).send({
          msg: "Login Succussfull!",
          token: jwt.sign({ userID: user._id }, `${process.env.key}`),
        });
      } else {
        res.status(400).send({ msg: "Invalid Credentials" });
      }
    });
  } else {
    res.status(400).send({ msg: "To login, you'll have to register first!" });
  }
});

module.exports = userRouter;
