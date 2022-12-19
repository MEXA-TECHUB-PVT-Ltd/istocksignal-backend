
const mongoose = require("mongoose");

const category_signalSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
 name:String
} 
);
module.exports = mongoose.model("category_signal", category_signalSchema);