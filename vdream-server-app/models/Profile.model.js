const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
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
    //   org_members: {
    //     type: Boolean,
    //     required: false,
    //     default: false
    //   }
  })
);

const Profile = mongoose.model("Profile", profileSchema);


exports.PersonalProfile = mongoose.model('PersonalProfile');
exports.OrganizationProfile = mongoose.model('OrganizationProfile');
