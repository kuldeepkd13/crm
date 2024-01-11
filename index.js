const express = require("express");
const { connection } = require("./config/db");
const { employeeRoute } = require("./routes/employeeroute");
const { enquiryRoute } = require("./routes/enquiryRoute");


require('dotenv').config();

const Port = process.env.port || 8080

const app = express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send("crm")
})

app.use("/employee",employeeRoute)
app.use("/enquiry", enquiryRoute)

app.listen(Port,async()=>{
    try {
        await connection
        console.log("Connect to Mongodb")
    } catch (error) {
        console.log(error)
        console.log("Db is not Connected")
    }
    console.log(`server is running at ${Port}`)

})