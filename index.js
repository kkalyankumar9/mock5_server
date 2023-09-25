const express=require("express")
const { connection } = require("./db")
const { appRoutes } = require("./routes/userRoutes")
const { employeeRute } = require("./routes/employeeRoute")
const  cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/",appRoutes)
app.use("/employees",employeeRute)




app.listen(8080,async()=>{
    try {
        await connection
        console.log("DB connected")
        console.log("Server is Running at Port 8080")
    } catch (error) {
        console.log(error)
    }
})