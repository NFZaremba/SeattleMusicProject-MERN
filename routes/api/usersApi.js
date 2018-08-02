const express = require("express"); // to use router we need express
const router = express.Router();
const gravatar = require("gravatar"); // avatar
const bcrypt = require("bcryptjs"); // encryption (hash/salt)
const jwt = require("jsonwebtoken"); // json web token
const keys = require("../../config/keys");
const passport = require("passport");
const request = require("request");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public route
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));
