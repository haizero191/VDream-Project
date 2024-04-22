const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/account.controller");
const AccountMiddleware = require("../middlewares/account.middleware");
const { accountValidateSchema } = require("../validations/account.validation");
const authMiddleWare = require("../middlewares/auth.middleware");





// Account Login
router.post("/test", AccountController.test);


// Account Login
router.post("/login", AccountController.login);

// Account Register
router.post(
  "/register",
  accountValidateSchema,
  AccountMiddleware.verifyEmail,
  AccountController.register
);

// Account Register Verify Email
router.post("/verify", AccountController.verify);

// Account Initial endpoint
router.get("/", AccountController.index);



module.exports = router;
