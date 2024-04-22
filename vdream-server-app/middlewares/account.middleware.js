const Account = require("../models/account.model");
const { generateVerificationCode } = require("../utils/functions");
const emailSender = require("../utils/mailSender/verifyEmail");
const VerifyCode = require("../models/verify_code.model");
const { validationResult, body } = require("express-validator");
const FormResponse = require("../utils/response/FormResponse");

/**
 * Middleware verify email
 * @param {Middleware verify email} req
 * @param {*} res
 * @param {*} next
 */
const verifyEmail = async (req, res, next) => {
  const result = validationResult(req);
  if (result.errors.length > 0) {
    next();
  }
  var generateCode = generateVerificationCode();
  emailSender(req.body.Email, generateCode).then((resulf) => {
    if (resulf) {
      try {
        var newVerifyCode = new VerifyCode({
          Email: req.body.Email,
          Code: generateCode,
        });
        newVerifyCode.save();
        next();
      } catch (error) {
        res.json(false, null, "Sending verify code failed");
      }
    } else {
      res.json(false, null, "Sending verify code failed");
    }
  });
};

module.exports = {
  verifyEmail
};
