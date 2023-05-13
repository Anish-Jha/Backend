const express=require('express');
const Home=require('../models/Home');
const homeRouter=express.Router();

homeRouter.get('/home',async(req,res)=>{
    try{
        const homes=await Home.find();
        res.status(200).send(homes);
    }catch(err){
        res.status(500).send({message:"Unable to process the request"})
    }
})

module.exports=homeRouter;