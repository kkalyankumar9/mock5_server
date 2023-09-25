const mongoose=require("mongoose");

const employeeSchema=mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    deparment:String,
    salary:Number,
},{VersionKey:false})

const EmployeesModelCol=new mongoose.model("employees",employeeSchema)

module.exports={EmployeesModelCol}


