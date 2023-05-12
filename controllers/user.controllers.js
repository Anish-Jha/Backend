const User = require('../models/User');
const jwt = require("jsonwebtoken");
const auth=require('../middleware/auth.middlewares')
const bcrypt = require("bcrypt");
require("dotenv").config();

const register=async (req, res) => {
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
};

const login=async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password,(err,result) => {
      if (result){
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
};

const users=async(req,res)=>{
  try{
    const user=await User.find();
    res.status(200).send(user);
  }catch(error){
    res.status(500).send({message:"Unable to process the request at the moment."})
  }
};

const getUser=async(req,res)=>{
  const { userID } = req.params;
    try{
      const user=await User.findById({_id:userID});
      res.status(200).send(user);
    }catch(err){
      res.status(500).send({message:"Unable to process the request at the moment."})
    }
};

const updateUser=async(req,res)=>{
  const { userID } = req.params;
  const payload = req.body;
  try{
    const user=User.findByIdAndUpdate({ _id: userID },payload);
    res.status(200).send({msg:'user updated successfully'});
  }catch (error){
      res.status(500).json({ message: 'Server error' });
    }
};

const deleteUser=async(req,res)=>{
  const { userID } = req.params;
  try{
    const user=User.findByIdAndDelete({ _id: userID });
    res.status(202).send({ message: 'Book deleted successfully' });
  }catch(err){
    console.log(err);
  }
}
module.exports = {
    users,
    getUser,
    register,
    login,
    updateUser,
    deleteUser
};
