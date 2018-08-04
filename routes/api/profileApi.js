const express = require("express"); // to use router we need express
const router = express.Router(); // bring in router
const mongoose = require("mongoose"); // for database data flow
const passport = require("passport"); // for protected routes

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validatemusicInput = require("../../validation/favoriteMusic");
//const validateEducationInput = require("../../validation/education");

// Load Profile Model
const Profile = require("../../models/ProfileModel");
// Load User Model
const User = require("../../models/UserModel");

// @route   api/profile
// @desc    Get current users profileatus
// @access  Private route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["firstName", "lastName", "email"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        // if there is a profile
        res.status(200).json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   api/profile/all
// @desc    Get all profiles
// @access  Public route
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["firstName", "lastName"])
    .then(profiles => {
      // If no profiles
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      // If there are profiles
      res.status(200).json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profile: "There are no profiles" });
    });
});

// @route   api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public route
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["firstName", "lastName"])
    .then(profile => {
      // If no profile
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      // If profile is found
      res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public route
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["firstName", "lastName"])
    .then(profile => {
      // If no profile
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      // If profile is found
      res.status(200).json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route   Post api/profile
// @desc    Create or Edit users profile
// @access  Private route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;

    const standardFields = [
      "handle",
      "company",
      "status",
      "website",
      "location",
      "bio"
    ];
    const socialFields = [
      "youtube",
      "twitter",
      "facebook",
      "linkedin",
      "instagram"
    ];

    standardFields.forEach(field => {
      if (req.body[field]) profileFields[field] = req.body[field];
    });
    // Instruments - Split into array
    if (typeof req.body.instruments !== "undefined") {
      profileFields.instruments = req.body.instruments.split(",");
    }

    profileFields.social = {};

    socialFields.forEach(field => {
      if (req.body[field]) profileFields.social[field] = req.body[field];
    });

    // Find user profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // If exists then Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.status(200).json(profile));
      } else {
        // If not then Create

        // Check if handle exists, get profile
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile to database
          new Profile(profileFields)
            .save()
            .then(profile => res.status(200).json(profile));
        });
      }
    });
  }
);

// @route   api/profile/favoritemusic
// @desc    Add experience to profile
// @access  Private route
router.post(
  "/favoritemusic",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Destructoring
    const { errors, isValid } = validatemusicInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Find user, get profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newMusic = {
        song: req.body.song,
        album: req.body.album,
        artist: req.body.artist,
        genre: req.body.genre
      };
      // Add to music array
      profile.favoritemusic.unshift(newMusic);

      // Save profile to database
      profile.save().then(profile => res.status(200).json(profile));
    });
  }
);

// @route   api/profile/band
// @desc    Add band to profile
// @access  Private route
router.post(
  "/band",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }

    // Find user, get profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newBand = {
        name: req.body.name,
        genre: req.body.genre,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // Add to exp array
      profile.band.unshift(newBand);

      // save profile to database
      profile.save().then(profile => res.status(200).json(profile));
    });
  }
);

// @route   DELETE api/profile/favoritemusic/:music_id
// @desc    Delete favoritemusic from profile
// @access  Private route
router.delete(
  "/favoritemusic/:music_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find user, get profile
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.favoritemusic
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.favoritemusic.splice(removeIndex, 1);

        // Save profile to database
        profile.save().then(profile => res.status(200).json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/band/:band_id
// @desc    Delete band from profile
// @access  Private route
router.delete(
  "/band/:band_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find user, get profile
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.band
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.band.splice(removeIndex, 1);

        // Save profile to database
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete use fromr profile
// @access  Private route
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find user and delete profile
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      // Delete user as well as profile
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.status(200).json({ success: true })
      );
    });
  }
);

module.exports = router;
