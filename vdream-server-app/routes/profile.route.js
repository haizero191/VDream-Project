const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profile.controller");


// Profile test endpoint
router.post("/test", ProfileController.test);


// Profile create endpoint
router.post("/create", ProfileController.create);

// Profile Initial endpoint
router.get("/", ProfileController.index);



module.exports = router;
