const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
//const request = require("request");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/UserModel");

// @route   api/users/register
// @access  Public route
router.post("/register", (req, res) => {
  // Validate form data
  const { errors, isValid } = validateRegisterInput(req.body);

  // Verify Google reCaptcha
  //   if (
  //     req.body.recaptchaResponse === undefined ||
  //     req.body.recaptchaResponse === "" ||
  //     req.body.recaptchaResponse === null
  //   ) {
  //     return res
  //       .status(400)
  //       .json({ success: false, msg: "please select captcha" });
  //   }

  //   const secretKey = "6LfkOWUUAAAAANdXh0iFmPx7foCq_S_oHw0oFgS0";

  //   const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${
  //     req.body.recaptchaResponse
  //   }&remotetip=${req.connection.remoteAddress}`;

  // Make request to verifyURL
  //   request(verifyUrl, (err, response, body) => {
  //     body = JSON.parse(body);

  //     // Unsucessfull
  //     if (body.success !== undefined && !body.success) {
  //       res
  //         .status(400)
  //         .json({ success: false, msg: "Failed captcha verification" });
  //     } else {
  //       // Successfull
  //       res.status(200).json({ success: true, msg: "Verification successful" });
  //     }
  //   });

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find one record
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      // Create new user

      // new instance of User Schema
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });

      // generate salt with bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        // hash our password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          } else {
            // save user to database
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.status(200).json(user))
              .catch(err => console.log(err));
          }
        });
      });
    }
  });
});

// @route   api/users/login
// @access  Public route
router.post("/login", (req, res) => {
  // Validate form data
  const { errors, isValid } = validateLoginInput(req.body);

  // const secretKey = "6LfkOWUUAAAAANdXh0iFmPx7foCq_S_oHw0oFgS0";

  // const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${
  //   req.body.recaptchaResponse
  // }`;

  // // Make request to verifyURL
  // request(verifyUrl, (err, response, body) => {
  //   body = JSON.parse(body);
  //   // Unsucessfull
  //   if (body.success !== undefined && !body.success) {
  //     res
  //       .status(400)
  //       .json({ success: false, msg: "Failed captcha verification" });
  //   } else {
  //     // Successfull
  //     res.status(200).json({ success: true, msg: "Verification successful" });
  //   }
  // });

  // Check form validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Validate user password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        };

        // Sign Token with payload
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            // return token
            res.status(200).json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   api/users/updaterole
// @access  Private route
//router.update(TODO)

// @route   api/users/current
// @access  Private route
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }), // 'jwt' is the strategy we're using
  (req, res) => {
    // return user payload
    res.status(200).json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role
    });
  }
);

module.exports = router;
