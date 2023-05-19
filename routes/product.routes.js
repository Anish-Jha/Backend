const express=require('express');
require("dotenv").config();
const Product=require('../models/Product');
const admin = require('../middleware/admin.middleware');
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
        res.status(500).send({message:'Unable to process the request at the moment'})
    }
})

productRouter.get('/product/:id',async(req,res)=>{
    try{
        const products=await Product.findById(req.params.id);
        res.status(200).send(products);
    }catch(err){
        res.status(500).send({message:'Unable to process the request at the moment'})
    }
})

productRouter.post('/addproduct',admin,async(req,res)=>{
    try{
       const products= new Product(req.body);
       await products.save();
       res.status(201).send(products);
    }catch(err){
        res.status(500).send({message:'Unable to process the request at the moment'})
    }
})

productRouter.patch('/product/edit/:id',admin, async (req, res) => {
    try {
      const id = req.params.id;
      const products = await Product.findByIdAndUpdate(id,req.body,
        { new: true });
      res.status(201).send(products);
    } catch (error){
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
// Deleting a Product
productRouter.delete('/product/delete/:id',admin, async (req, res) => {
    try{
      const id = req.params.id;
      await Product.findByIdAndDelete(id);
      res.status(200).send({ message: 'Product deleted successfully' });
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});


module.exports=productRouter;