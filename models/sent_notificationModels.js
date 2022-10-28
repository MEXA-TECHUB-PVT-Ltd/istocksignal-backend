

const mongoose =  require("mongoose");

const sentNotificationSchema= new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    notification_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"notification"
    },
    message:String,
    company_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company"
    },
    date_sent:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("sent_notification" , sentNotificationSchema)