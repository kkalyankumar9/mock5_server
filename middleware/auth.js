const jwt=require("jsonwebtoken")
const { BlackListmodel } = require("../models/blocklist")

const auth=(req,res,next)=>{
    const header=req.headers.authorization

    
        if(header){
            const blockli= BlackListmodel.find({
                blocklist:{$in:header}
            })
            if(blockli.length>0){

                  res.send({"msg":"login again"})
            }
            jwt.verify(header,"mock",(err,decord)=>{
                if(decord){
                    next()
                    
                }else{
                    res.send({err:"login again"})
                    return
                }

            })

        }else{
            res.send({"msg":"login again"})
        }
    
        
    
   
}

module.exports={auth}