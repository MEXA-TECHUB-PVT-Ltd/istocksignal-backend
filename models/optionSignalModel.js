
const mongoose = require("mongoose");

const optionSignalSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
 companyId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"company"
 },

  buyTarget: {
    type:Number
  }, 

  stopLoss:{
    type:Number
  }, 

  actualGain:{
    type:Number
  },

  sellTarget:Number,
  
  maxGain : Number,

  signalNote:String,

  closingNote:String,

  dateSignalSent:{
    type:Date,
    default:Date.now()
    
  },
  status:{
    type:String,
    enum:["open" , "closed"],
    default:"open"
  }
} 
);
module.exports = mongoose.model("optionSignal", optionSignalSchema);