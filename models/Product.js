const mongoose = require('mongoose');
const productSchema=mongoose.Schema(
    {
        image: String,
        subhead: String,
        name: String,
        price:Number,
        category:String,
        description:String,
        discount:String
    },{
  versionKey:false
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports=Product;

