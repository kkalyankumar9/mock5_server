const express=require("express")
const { auth } = require("../middleware/auth")
const { EmployeesModelCol } = require("../models/employeeModel")
 
const employeeRute=express.Router()
 employeeRute.use(auth)
employeeRute.get("/",async(req,res)=>{
  
    try {
        const data=await EmployeesModelCol.find()
        res.send(data)
        
    } catch (error) {
        res.send(error)
    }
})

employeeRute.post("/create",async(req,res)=>{
  
    try {
        const data=new EmployeesModelCol(req.body)
        await data.save()
        res.send({"msg":"Employee Data added"})
        console.log(data)
        
    } catch (error) {
        res.send({"error":error})
    }
})
employeeRute.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const data=await EmployeesModelCol.findByIdAndDelete({_id:id})
        res.send({"msg":"Employee Data Deleted"})
      
    } catch (error) {
        res.send({"error":error})
    }

})
employeeRute.patch("/patch/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const data=await EmployeesModelCol.findByIdAndUpdate({_id:id},req.body)
        res.send({"msg":"Employee Data Update"})
        console.log(data)
      
    } catch (error) {
        res.send({"error":error})
    }

})

module.exports={employeeRute}