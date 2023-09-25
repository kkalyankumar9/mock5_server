
const bcrypt=require("bcrypt")
const express=require("express")
const jwt=require("jsonwebtoken")
const { UserModelCol } = require("../models/userModel")
const { BlackListmodel } = require("../models/blocklist")
const appRoutes=express.Router()

appRoutes.post("/signup",async(req,res)=>{
    const {email,password,confirm_password}=req.body
    try {
        const data= await UserModelCol.find({email})

        if(data.length){
          res.send({msg:"User alReady Signup ..please login"})
        }else {
            //   if(password===confirm_password){
                bcrypt.hash(password, 2, async(err, hash)=> {
                  if(err){
                    res.send({err:err})
                  }else{
                    const userdata=new UserModelCol({email,password:hash,confirm_password})
                    await userdata.save()
                    res.send({msg:"user Signup successfully"})
                    console.log(userdata)
                  }
    
                });
            // }else{
            //    res.send({err:"please check both passwords"})
            //  }

        }

    } catch (error) {
        
    }

})

appRoutes.post("/signin",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModelCol.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token=jwt.sign({user:"mock"},"mock")
                    res.send({"msg":"user Signin succssfully",token:token})
                    console.log(token)
                 
                }else{
                    res.send({err:err})
                }
                // result == true
            });
        }

        
    } catch (error) {
        res.send({error:error})
    }
})

appRoutes.get("/logout",async(req,res)=>{
    const header=req.headers.authorization
    try {
        if(header){
            await BlackListmodel.updateMany({},{
                $push:{blocklist:[header]}
            
            })
            res.send({"msg":"user logout succssfully"})
        }
        
    } catch (error) {
        res.send({error:error}) 
    }

})

module.exports={appRoutes}