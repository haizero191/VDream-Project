const mongoose = require("mongoose");

const verifyCodeSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true
  },
  Code: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  ExpireAt: { type: Date, expires: 300, default: Date.now} 
});

const verifyCode = mongoose.model("verify_code", verifyCodeSchema);

module.exports = verifyCode;
