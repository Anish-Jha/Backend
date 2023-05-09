const express=require("express")
const dotenv = require('dotenv');
dotenv.config();
const connection = require('./config/db');
const userRouter=require('./routes/user.routes');
const app=express()
app.use(express.json());

app.get("/",(req,res)=>{
    res.send({msg:"Welcome to Fashionhub app"})
})

app.use(userRouter)


const port = process.env.PORT;
app.listen(port,async()=>{
    try{
        await connection
        console.log("connected to Database")
    }catch(err) {
        console.log(err);
    }
    console.log("server is running on 8080");
})