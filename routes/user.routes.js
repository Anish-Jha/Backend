const express=require('express')
const { register, users, login, deleteUser, updateUser, getUser }=require('../controllers/user.controllers')
const auth = require('../middleware/auth.middlewares')
const userRouter=express.Router()

userRouter.get('/users',auth,users)
userRouter.get('/users/:userID',auth,getUser)
userRouter.patch('/update/:userID',auth,updateUser)
userRouter.delete('/delete/:userID',auth,deleteUser)
userRouter.post('/register',register)
userRouter.post('/login',login)

module.exports=userRouter
