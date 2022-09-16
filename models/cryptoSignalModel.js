
const mongoose = require("mongoose");

const cryptoSignalSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
 companyId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"company"
 },
  type: {
    type:String,
    enum:["swingCrypto" , "investedCrypto" , "closedCrypto"],
    required:true
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
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
} 
);
module.exports = mongoose.model("cryptoSignal", cryptoSignalSchema);