const mongoose=require("mongoose")

const blocklischma=mongoose.Schema({
    blocklist:{type:[String]}
})
const BlackListmodel=new mongoose.model("blocklist",blocklischma)

module.exports={BlackListmodel}