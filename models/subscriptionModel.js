
const mongoose = require("mongoose");
const subscriptionSchema= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
 name:String,
})
module.exports = mongoose.model("subscription", subscriptionSchema);