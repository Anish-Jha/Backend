const express=require("express")
const dotenv = require('dotenv');
dotenv.config();
const connection = require('./config/db');
const userRouter=require('./routes/user.routes');
const productRouter=require('./routes/product.routes')
const app=express()
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(userRouter,productRouter);
app.get("/",(req,res)=>{
    res.send({msg:"Welcome to fashionhub app"})
})

const port = process.env.PORT || 8080;
app.listen(port,async()=>{
    try{
        await connection
        console.log("connected to Database")
    }catch(err) {
        console.log(err);
    }
    console.log(`server is running on ${port}`);
})
