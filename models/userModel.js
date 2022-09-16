
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
  userName: String,
  signupType:{
    type:String,
    enum:['email', 'google',],
  },
  email: {
    type: String,
    min: 6,
    max: 255,
  },

  gender:{
    type: String,
    enum: ['male', 'female' , 'preferNotToSay'],
  },

  dateOfBirth:{
    type:Date
  },

  profileImage:{
    type:String,
  },
 
  password: {
    type: String,
    required: true,
    max: 2048,
    min: 6,
  },
  blockStatus:{
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
 }

} 

);

module.exports = mongoose.model("user", userSchema);