const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    name:String,
    quantity:Number
})

const productModel=mongoose.model('product',productSchema);

module.exports={
    productModel
}