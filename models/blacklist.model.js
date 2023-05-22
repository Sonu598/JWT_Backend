const mongoose=require('mongoose');

const blacklistSchema=mongoose.Schema({
    token:{
        type:String,
        require:true,
        unique:true
    }
})

const blacklistModel=mongoose.model('blacklist',blacklistSchema);

module.exports={
    blacklistModel
}