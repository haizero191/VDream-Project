const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  IsActived: {
    type: Boolean,
    default: false
  },
  Profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    default: null
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  }
});



const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
