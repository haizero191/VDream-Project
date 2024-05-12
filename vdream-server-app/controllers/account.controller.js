const Account = require("../models/Account.model");
const FormResponse = require("../utils/response/FormResponse");
const { hashPassword, verifyPassword } = require("../utils/bcrypt");
const VerifyCode = require("../models/verify_code.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

/**
 * Account Controller for handler request from client and response data
 */
class AccountController {
  async index(req, res) {
    res.json("hehehehe");
  }

  async login(req, res) {
    try {
      const { Email, Password } = req.body;
      // Check email and password
      if (Email && Password) {
        const Get_Account = await Account.findOne({ Email: Email });
        if (Get_Account && verifyPassword(Password, Get_Account.Password)) {
          // Create access token and refresh token
          const payload = {
            account: {
              id: Get_Account._id,
            },
          };

          const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1m",
          });

          const refreshToken = jwt.sign(
            payload,
            process.env.SECRET_KEY, // Use a separate secret for refresh tokens
            { expiresIn: "1d" } // Set longer expiry
          );

          res.json(
            FormResponse(
              true,
              {
                accessToken: accessToken,
                refreshToken: refreshToken,
              },
              "Login success! wellcome to VDream"
            )
          );
        } else
          res.json(
            FormResponse(
              false,
              null,
              "Login failed , Please check your email and password"
            )
          );
      } else
        res.json(
          FormResponse(
            false,
            null,
            "Login failed , Please check your email and password"
          )
        );
    } catch (error) {
      res.json(
        FormResponse(
          false,
          null,
          "Login failed , Please check your email and password"
        )
      );
    }
  }

  async register(req, res) {
    const result = validationResult(req);
    const { Email } = req.body;

    // Handle Errors
    if (result.errors && result.errors.length > 0) {
      res.json(FormResponse(false, null, "Data Error", result.errors));
    } else {
      // Handler Create new Account
      try {
        // var hass = await hashPassword(Password);
        var newAccount = new Account({
          Email: Email,
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
        return res
          .status(400)
          .json(FormResponse(false, null, "Invalid verification code"));
      }
      // Handle updated field [isVerify] in account
      try {
        await Account.findOneAndUpdate({ Email: Email }, { IsActived: true });

        const Get_Account = await Account.findOne({ Email: Email });
        // Create access token and refresh token
        const payload = {
          account: {
            id: Get_Account._id,
          },
        };
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "1m",
        });
        const refreshToken = jwt.sign(
          payload,
          process.env.SECRET_KEY, // Use a separate secret for refresh tokens
          { expiresIn: "1d" } // Set longer expiry
        );


        res.json(FormResponse(true, {
          accessToken: accessToken,
          refreshToken: refreshToken
        }, "Verify Successfully"));

      } catch (error) {
        console.log(error);
        res.json(FormResponse(false, null, "Something wrong"));
      }
    } else {
      res.json(FormResponse(false, null, "Data is not valid"));
    }
  }

  async createPassword(req, res) {
    const result = validationResult(req);
    const { Password, Email } = req.body;


    if (result.errors && result.errors.length > 0) {
      res.json(FormResponse(false, null, "Data Error", result.errors));
    }
    else {
      // Handler Create new Password
      try {
        var hass = await hashPassword(Password);
        var UPDATE_ACCOUNT_BY_EMAIL = await Account.findOneAndUpdate({Email: Email}, {
          Password: hass,
          UpdatedAt: Date.now()
        })
        res.json(FormResponse(true, UPDATE_ACCOUNT_BY_EMAIL, "Password created..."));

      } catch (error) {
        res.json(FormResponse(false, null, "Password create failed"));
      }
    }
  }

  async logout(req, res) {}

  async test(req, res) {
    res.json("testing...");
  }
}

module.exports = new AccountController();
