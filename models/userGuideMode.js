

const mongoose = require("mongoose");
const guideSchema= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
topicName:String,
detail:{
    type:String,
},
isDeleted:{
    type:Boolean,
    default:false,
}

})
module.exports = mongoose.model("userGuide", guideSchema);