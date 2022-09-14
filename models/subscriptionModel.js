

const mongoose = require("mongoose");
const subscriptionSchema= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
type:{
    type:String,
    enum:["monthly","yearly"]
},
sub_fee:{
    type:String,
},
features:[String]
})
module.exports = mongoose.model("subscription", subscriptionSchema);