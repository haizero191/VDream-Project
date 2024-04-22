const Account = require("../models/account.model");
const FormResponse = require("../utils/response/FormResponse");
const { hashPassword, verifyPassword } = require("../utils/bcrypt");
const VerifyCode = require("../models/verify_code.model");
const { validationResult } = require("express-validator");

/**
 * Account Controller for handler request from client and response data
 */
class AccountController {
  async index(req, res) {
    res.json("hehehehe");
  }

  async login(req, res) {
    const { email, password } = req.body;
    const result = aw;
  }

  async register(req, res) {
    const result = validationResult(req);
    const { Email, Password, Type } = req.body;
    console.log(Email)
  
    // Handle Errors
    if (result.errors && result.errors.length > 0) {
      res.json(FormResponse(false, result.errors, "Data Error"));
    } else {
      // Handler Create new Account
      try {
        var hass = await hashPassword(Password);
        var newAccount = new Account({
          Email: Email,
          Password: hass,
          Type: Type
        });
        newAccount.save();
        res.json(FormResponse(true, null, "Verifying email..."));
      } catch (error) {
        res.json(FormResponse(false, null, "Verify email Failed..."));
      }
    }
  }

  async verify(req, res) {
    const { Email, Code } = req.body;
    if (Email && Code) {
      // Check verifycode
      const Get_VerifyCode_By_Email = await VerifyCode.findOne({
        Email: Email,
        Code: Code,
      });
      // Handle verification failure
      if (!Get_VerifyCode_By_Email) {
        return res.status(400).json(FormResponse(false, null, "Invalid verification code"));
      }
      // Handle updated field [isVerify] in account
      try {
        await Account.findOneAndUpdate({ Email: Email }, { IsActived: true });
        res.json(FormResponse(true, null, "Verify Successfully"));
      } catch (error) {
        console.log(error)
        res.json(FormResponse(false, null, "Something wrong"));
      }
    } else {
      res.json(FormResponse(false, null, "Data is not valid"));
    }
  }

  async logout(req, res) {}


}

module.exports = new AccountController();
