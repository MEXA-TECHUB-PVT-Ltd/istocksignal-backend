const mongoose = require("mongoose");

const NotificationSchema= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,

name:{
    type:String,
},
body:{
    type:String,
},
image:String
})
module.exports = mongoose.model("Notification", NotificationSchema);