const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profile.controller");
const { personalProfileValidateSchema, organizationProfileValidateSchema } = require("../validations/profile.validation");

// Profile test endpoint
router.post("/test", ProfileController.test);


// Personal Profile create endpoint
router.post("/create/personal-profile", personalProfileValidateSchema, ProfileController.create);

// Organization Profile create endpoint
router.post("/create/organization-profile", organizationProfileValidateSchema, ProfileController.create);

// Profile Initial endpoint
router.get("/", ProfileController.index);



module.exports = router;
