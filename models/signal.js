
const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
 category_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"category_signal"
 },
  company_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"company"
    
  },
  type_cat_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"type_category_signal"
  },
  buy_target: {
    type:Number
  }, 
  stop_loss:{
    type:Number
  }, 

  actual_gain:{
    type:Number
  },

  sell_target:Number,
  
  max_gain : Number,

  signal_notes:String,

  closing_notes:String,

  date_created:{
    type:Date,
    default:Date.now()
    
  },
  isDeleted: {
    type:Boolean,
    default:false
  },

} 
);
module.exports = mongoose.model("signal", signalSchema);