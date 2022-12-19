
const mongoose = require("mongoose");
const subscriptionFeatureSchema= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
 name:String,
 subscription_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"subscription",
 }
})
module.exports = mongoose.model("subscription_feature", subscriptionFeatureSchema);
