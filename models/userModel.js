
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,

  username: String,
  signupType:{
    type:String,
    enum:['email', 'google',],
  },
  email: {
    type: String,
    min: 6,
    max: 255,
  },

  password: {
    type: String,
    required: true,
    max: 2048,
    min: 6,
  },
  account_status:{
    type:Boolean,
    default: false,
  },
  fcmToken:{
    type:String,
    required:false,
 },
 isDeleted:{
  type:Boolean,
  default:false
 },
 image:{
  type:String,
 }

} 

);

module.exports = mongoose.model("user", userSchema);