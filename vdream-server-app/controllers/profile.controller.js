const {
  PersonalProfile,
  OrganizationProfile,
} = require("../models/Profile.model");


/**
 * Account Controller for handler request from client and response data
 */
class ProfileController {
  async index(req, res) {
    res.json("hehehehe");
  }

  async create(req, res) {
    res.json("creating...");
  }

  async test(req, res) {
    const personalProfile = new PersonalProfile();
    const organizationProfile = new OrganizationProfile();
    personalProfile.save()
    organizationProfile.save()

    res.json("hehehe");
  }
}

module.exports = new ProfileController();
