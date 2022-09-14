const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
  companyName: {
    type: String,
  },
  companyLogo: {
    type: String,
  },
  
  description:String
} 
);
module.exports = mongoose.model("company", companySchema);