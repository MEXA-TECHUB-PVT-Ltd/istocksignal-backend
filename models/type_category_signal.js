
const mongoose = require("mongoose");

const type_category_signalSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
 name:String,
 category_signal_id:mongoose.Schema.Types.ObjectId,
} 
);
module.exports = mongoose.model("type_category_signal", type_category_signalSchema);