const jwt=require('jsonwebtoken');
const { blacklistModel } = require('../models/blacklist.model')
const { userModel } = require('../models/user.model');

const authenticate=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        const isBlacklisted=await blacklistModel.findOne({token});
        if (isBlacklisted) {
            return res.status(401).send('Token is Blacklisted');
        } else {
            const decodedToken=jwt.verify(token,'secret');
            const {userID}=decodedToken;
            const user=await userModel.findById(userID);
            if (!user) {
                return res.status(401).send('Please Login');
            }
            req.user=user;
            next();
        }
    } catch (err) {
        return res.status(401).send(err.message);       
    }
}

module.exports={
    authenticate
}