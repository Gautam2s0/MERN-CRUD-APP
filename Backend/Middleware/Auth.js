const express=require("express")

var jwt = require('jsonwebtoken');

const Autherisation =async(req,res,next)=>{
    const token=req.headers.authorization
    try{
        jwt.verify(token, 'stack',(err, decoded)=> {
            if(err){
                res.status(400).send({
                    msg:"login first"
                })
            }
            else{
                next()
            }
          });
       
    }
    catch(err){
        res.status(400).send(err)
    }
    // console.log(token)
    // next()
}

module.exports={Autherisation}