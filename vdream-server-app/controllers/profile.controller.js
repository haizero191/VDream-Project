const {
  Profile,
  PersonalProfile,
  OrganizationProfile,
} = require("../models/Profile.model");
const Account = require("../models/Account.model");
const FormResponse = require("../utils/response/FormResponse");
const { validationResult } = require("express-validator");

/**
 * Account Controller for handler request from client and response data
 */
class ProfileController {
  async index(req, res) {
    res.json("hehehehe");
  }

  async create(req, res) {
    const result = validationResult(req);
    if (result.errors && result.errors.length > 0) {
      res.json(FormResponse(false, result.errors, "Data Error"));
    }
    try {
      const { Email, Type, ...profileData } = req.body;
      // Kiểm tra tài khoản đã tồn tại chưa
      const Get_Account = await Account.findOne({ Email: Email }).select("-Password");
      if (!Get_Account)
        res.status(404).json(FormResponse(false, null, "Can't found account !"));
      else {
        // Tạo Profile cho tài khoản
        switch (Type) {
          // Tạo profile cho cá nhân
          case "Personal":
            // Kiểm tra Profile đã được tạo chưa
            const Get_PersonalProfile = await Profile.findOne({ Email: Email });
            if (Get_PersonalProfile)
              res.json(FormResponse(false, null, "Profile already exists ...!"));
            else {
              try {
                const newProfile = new PersonalProfile({ ...profileData, Email });
                await newProfile.save();
                await Account.findOneAndUpdate(
                  { Email: Email },
                  { Profile: newProfile._id, Type: Type }
                );
                res.json(FormResponse(true, null, "Profile was created !"));
              } catch (error) {
                res.json(FormResponse(false, error, "Profile create failed !"));
              }
            }
            break;
          // Tạo profile cho tổ chức
          case "Organization":
            const Get_OrganizationProfile = await Profile.findOne({ Email: Email });
            if (Get_OrganizationProfile)
              res.json(FormResponse(false, null, "Profile already exists ...!"));
            else {
              try {
                const newProfile = new OrganizationProfile({ ...profileData, Email });
                await newProfile.save();
                await Account.findOneAndUpdate(
                  { Email: Email },
                  { Profile: newProfile._id, Type: Type }
                );
                res.json(FormResponse(true, null, "Profile was created !"));
              } catch (error) {
                res.json(FormResponse(false, error, "Profile create failed !"));
              }
            }
            break;
          default:
            break;
        }
      }
    } catch (error) {}
  }

  async test(req, res) {
    const personalProfile = new PersonalProfile();
    const organizationProfile = new OrganizationProfile();
    personalProfile.save();
    organizationProfile.save();

    res.json("hehehe");
  }
}

module.exports = new ProfileController();
