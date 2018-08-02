const express = require("express"); // to use router we need express
const router = express.Router(); // bring in router
const mongoose = require("mongoose"); // for database data flow
const passport = require("passport"); // for protected routes

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public route
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));
