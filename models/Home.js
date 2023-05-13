const mongoose=require('mongoose');
const homeSchema=mongoose.Schema(
    {
    image1:String,
    image2:String,
    description:String,
    title:String,
    price:String
    },
    {
    versionKey:false
    }
)

const Home=mongoose.model('Home',homeSchema)

module.exports=Home;