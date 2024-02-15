const userModule = require("../models/userModel")
const jwt = require('jsonwebtoken')

const auth =(req,res,next)=>{
    try{
       const token= req.headers["jwt"];
       if(!token){
        return res.status(401).send({massage:"unauthorized"})

       }
       const {email}=jwt.verify(token,"myjwtsecret");
       const user =userModule.findOne({email})
       
       if(!user){
        return res.status(401).send({massage:"unauthorized"})
       }
       
       next();

    }catch(err){
        return res.status(401).send({massage:"unauthorized"})
    }
}

module.exports={auth};