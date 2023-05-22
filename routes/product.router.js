const express=require("express")
const{productModel}=require("../model/product.model")
const{authorise}=require("../middleware/authorise")
const productRouter=express.Router();

//............get all products.............
productRouter.get("/",authorise(["user","seller"]),async(req,res)=>{
    const products=await productModel.find()
    res.send(products)
})

//..........add products..................
productRouter.post("/addproducts",authorise(["seller"]),async(req,res)=>{
    const payload=req.body;
    try {
        const pro=new productModel(payload)
        await pro.save()
        res.send("new products added")
    } catch (error) {
        res.send({"msg":"something went wrong","error":error.message})
    }
})

//........delete...........
productRouter.delete("/deleteproducts/:id",authorise(["seller"]),async(req,res)=>{
    const proID=req.params.id
    const pro=await productModel.findOne({_id:proID})
    const userID_in_pro=pro.userID_in_pro
    const userID_making_req=req.body.user
    try {
        if(userID_making_req!=userID_in_pro){
            res.send({"msg":"you are not authorizes"})
        }else{
            await productModel.findByIdAndDelete({_id:proID})
            res.send("deleted...")
        }
    } catch (error) {
        res.send({"msg":"something went wrong","error":error.message})
    }
})


module.exports={productRouter}