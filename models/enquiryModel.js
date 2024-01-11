const mongoose = require("mongoose")


const enquirySchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  courseInterest: { type: String, required: true },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' }
},{
    versionKey:false
})

const EnquiryModel = mongoose.model("enquiry", enquirySchema);

module.exports={EnquiryModel}