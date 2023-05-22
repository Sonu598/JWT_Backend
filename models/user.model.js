const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    role:{
        type:String,
        default:'user',
        enum:['user','seller']
    }
})

const userModel=mongoose.model('user',userSchema);

module.exports={
    userModel
}