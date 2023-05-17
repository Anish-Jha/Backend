const express=require("express");
const dotenv=require('dotenv');
dotenv.config();
const connection = require('./config/db');
const userRouter=require('./routes/user.routes');
const productRouter=require('./routes/product.routes')
const app=express()
console.log(process.env.JWT)
app.use(express.json());
const cors = require('cors');
const homeRouter = require("./routes/home.routes");
const cartRouter = require("./routes/cart.routes");
const corsOptions ={
    origin:'*', 
    credentials:true,       
}
app.use(cors(corsOptions));
app.use(userRouter,productRouter,homeRouter,cartRouter);
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
