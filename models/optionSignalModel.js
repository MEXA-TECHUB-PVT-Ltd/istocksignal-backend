
const mongoose = require("mongoose");

const optionSignalSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
 companyId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"company"
 },
  type: {
    type:String,
    enum:["openSignal" , "closedSignal" ,]
  },
  buyTarget: {
    type:Number
  }, 
  stopLoss:{
    type:Number
  }, 
  sellTarget:Number,
  maxGain : String,
  notes:String,

  dateSignalSent:{
    type:Date,
    default:Date.now()
    
  }
} 
);
module.exports = mongoose.model("optionSignal", optionSignalSchema);