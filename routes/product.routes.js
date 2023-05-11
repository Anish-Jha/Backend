const express=require('express');
require("dotenv").config();
const Product=require('../models/Product');
const productRouter=express.Router();

productRouter.get('/product',async(req,res)=>{
    try{
    let filters = {};
    const category=req.query.category;
    const order=req.query.order;
    let sort = {};
    if(category){
        filters.category=category;
    }
    if (order === "asc") {
        sort.price = 1;
    } else if (order === "desc") {
        sort.price = -1;
    }
        const products=await Product.find(filters).sort(sort);
        res.status(200).send(products);
    }catch(err){
        console.log(err);
        res.status(500).send({message:'Unable to process the request at the moment'})
    }
})

productRouter.get('/product/:id',async(req,res)=>{
    try{
        const products=await Product.findById(req.params.id);
        res.status(200).send(products);
    }catch(err){
        console.log(err);
        res.status(500).send({message:'Unable to process the request at the moment'})
    }
})

// productRouter.post('/addproduct',async(req,res)=>{
//     try{
//        const products= new Product(req.body);
//        await products.save();
//        res.status(201).send(products);
//     }catch(err){
//         console.log(err);
//         res.status(500).send({message:'Unable to process the request at the moment'})
//     }
// })


module.exports=productRouter;