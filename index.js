const express=require("express")
const dotenv = require('dotenv');
dotenv.config();
const connection = require('./config/db');
const userRouter=require('./routes/user.routes');
const app=express()
app.use(express.json());
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,       
}
app.use(cors(corsOptions));
app.use(userRouter);
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
