const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    email:String,
    password:String,
    confirm_password:String
},{VersionKey:false})

const UserModelCol=new mongoose.model("userdata",userSchema)

module.exports={UserModelCol}