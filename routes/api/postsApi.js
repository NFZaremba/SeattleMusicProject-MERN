const express = require("express"); // to use router we need express
const router = express.Router();
const mongoose = require("mongoose"); // map to database
const passport = require("passport"); // for protected routes

// Load Post Model
const Post = require("../../models/Post");
// Load Profile Model
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public route
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));
