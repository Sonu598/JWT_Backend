const express=require("express")
const{userModel}=require("../model/user.model")
const{blacklistModel}=require("../model/blacklist.model")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()

//...................signup................
userRouter.post("/signup",(req,res)=>{
    const{name,email,pass,role}=req.body;
    try {
        bcrypt.hash(pass,5,async function(err,hash){
            if(err){
                res.send({"msg":"something went wrong","error":err.message})
            }else{
                const user= new userModel({name,email,pass:hash,role})
                await user.save()
                res.send({"msg":"New user has been registered"})
            }
        })
    } catch (error) {
        res.send({"msg":"something went wrong","error":error.message})
    }
})

//............login............
userRouter.post("/login",async(req,res)=>{
    const{email,pass}=req.body;
    try {
        const user =await userModel.find({email})
        if(user){
            bcrypt.compare(pass,user[0].pass,function (err,result){
                if(result){
                    var token=jwt.sign({userID:user[0]._id},"masai",{expiresIn:60})
                    var refresh_token=jwt.sign({userID:user[0]._id},"masai1",{expiresIn:300})

                    res.cookie("token",token)
                    res.cookie("refresh_token",refresh_token)

                    res.send({"msg":"Login successful","token":token,"refresh_token":refresh_token})
                }else{
                    res.send("wrong credentials")
                }
            })
        }else{
            res.send("wrong credentials")
        }
    } catch (error) {
        res.send({"msg":"something went wrong","error":error.message})
    }
})

//...............logout..............
userRouter.post("/logout",async(req,res)=>{
    try {
        const token=req.cookies.token
        const blacklistedToken=new blacklistModel({token})
        await blacklistedToken.save()

        res.status(200).send("Logged out successful")
    } catch (error) {
        res.send({"msg":"something went wrong","error":error.message})
    }
})

//..............refresh token................
userRouter.get("/refresh",(req,res)=>{
    const refresh_token=req.cookies.refresh_token
    if(!refresh_token){
        res.send({"msg":"pls login3"})
    }else{
        jwt.verify(refresh_token,"masai1",(err,decoded)=>{
            if(err){
                res.send({"msg":"pls login3"})
            }else{
               var token=jwt.sign({userID:decoded.userID},"masai",{expiresIn:300})
               res.cookie("token",token)
               res.send({"msg":"login successfull","token":token})
            }
        })
    }

})


module.exports={userRouter}