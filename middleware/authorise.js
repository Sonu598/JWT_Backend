const auhorise=(permittedRole)=>{
    return (req,res,next)=>{
        const user_role=req.user.role;
        if (permittedRole.includes(user_role)){
            next();
        } else {
            res.send('You are Unathorised');
        }
    }
}

module.exports={
    auhorise
}