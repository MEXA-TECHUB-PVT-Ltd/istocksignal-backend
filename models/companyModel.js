const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
  companyName: {
    type: String,
  },
  companyLogo: {
    type: String,
  },
  
  description:String,
  isDeleted:{
    type:Boolean,
    default:false,
  }
  
} 
);
module.exports = mongoose.model("company", companySchema);