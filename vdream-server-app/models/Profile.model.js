const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    default: null,
  },
  Address: {
    type: String,
    required: false,
    default: null,
  },
  Phone: {
    type: String,
    required: false,
    default: null,
  },
  Description: {
    type: String,
    required: false,
    default: null,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PersonalProfileSchema = profileSchema.discriminator(
  "PersonalProfile",
  new mongoose.Schema({
    LastName: {
      type: String,
      required: false,
      default: null,
    },
    FirstName: {
      type: String,
      required: false,
      default: null,
    },
    DreamCoins: {
      type: Number,
      required: false,
      default: 0,
    },
  })
);

const OrganizationProfileSchema = profileSchema.discriminator(
  "OrganizationProfile",
  new mongoose.Schema({
    Org_name: {
      type: String,
      required: false,
      default: null,
    },
    Org_validate: {
      type: Boolean,
      required: false,
      default: false,
    },
    VDT: {
      type: Number,
      required: false,
      default: 0,
    },
    // Org_members: {
    //   type: Boolean,
    //   required: false,
    //   default: false,
    // },
  })
);

exports.Profile = mongoose.model("Profile", profileSchema);

exports.PersonalProfile = mongoose.model("PersonalProfile");
exports.OrganizationProfile = mongoose.model("OrganizationProfile");
