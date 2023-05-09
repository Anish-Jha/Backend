const express=require("express")
const dotenv = require('dotenv');
dotenv.config();
const connection = require('./config/db');
const cors=require("cors")
const userRouter=require('./routes/user.routes');
const bookRouter=require('./routes/book.routes');
const orderRouter=require('./routes/order.routes');
const app=express()
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/",(req,res)=>{
    res.send({msg:"Welcome to bookstore app"})
})

app.use(userRouter,bookRouter,orderRouter)


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