const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller")

// Profile create endpoint
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
