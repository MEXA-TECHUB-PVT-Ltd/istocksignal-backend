
const mongoose = require("mongoose");
const userSubscriptionSchema= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
 name:String,
 user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
 },
 date_subscribed:{
    type:String
 },
 subscription_end_date:{
    type:String,
 },
 subscription_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"subscription",
 }
})
module.exports = mongoose.model("user_subscription", userSubscriptionSchema);
