const mongoose = require("mongoose")


const employeeSchema = mongoose.Schema({
   email:{ type: String, required: true },
   password : { type: String, required: true }

},{
    versionKey:false
})

const EmployeeModel = mongoose.model("employee" , employeeSchema)

module.exports={EmployeeModel}