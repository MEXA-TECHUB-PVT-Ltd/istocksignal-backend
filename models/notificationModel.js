
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
  },
} 
);
module.exports = mongoose.model("notification", notificationSchema);