const User = require('../models/User');
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth=require('../middleware/auth.middleware')
require("dotenv").config();
const userRouter=express.Router()

userRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).send({ msg: "User already exists, please login to continue" });
    }
    bcrypt.hash(password, 3, async (err, hash) => {
      const newUser = new User({
        name,
        email,
        password: hash,
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
          token: jwt.sign({ userID: user._id }, `${process.env.JWT}`),
        });
      } else {
        res.status(400).send({ msg: "Invalid Credentials" });
      }
    });
  } else {
    res.status(400).send({ msg: "To login, you'll have to register first!" });
  }
});

userRouter.get('/allusers',auth,async(req,res)=>{
  try{
    const user=await User.find();
    res.status(200).send(user);
  }catch(error){
    console.log(error);
    res.status(500).send({message:"Unable to process the request at the moment."})
  }
})

userRouter.get('/users',auth,async(req,res)=>{
  try{
    const user=await User.findOne({_id:req.body.userID});
    res.status(200).send(user);
  }catch(error){
    console.log(error);
    res.status(500).send({message:"Unable to process the request at the moment."})
  }
})

userRouter.patch('users/:id',async(req,res)=>{
  try{
    const user=User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).send(user);
  }catch (error){
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
})

userRouter.delete('users/:id',async(req,res)=>{
  try{
    const user=User.findByIdAndDelete(req.params.id,req.body,{new:true});
    res.status(202).send({ message: 'Book deleted successfully' });
  }catch(err){
    console.log(err);
  }
})
module.exports = userRouter;
