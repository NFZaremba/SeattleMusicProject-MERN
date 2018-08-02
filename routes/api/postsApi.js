const express = require("express"); // to use router we need express
const router = express.Router();
const mongoose = require("mongoose"); // map to database
const passport = require("passport"); // for protected routes

// Load Post Model
const Post = require("../../models/PostModel");
// Load Profile Model
const Profile = require("../../models/ProfileModel");

// Validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public route
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   Get all api/posts
// @access  Public route
router.get("/", (req, res) => {
  // Find post
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res.status(404).json({ nopostsfound: "No posts found with that Id" })
    );
});

// @route   GetById api/posts/:id
// @access  Public route
router.get("/:id", (req, res) => {
  // Find post
  Post.findById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that Id" })
    );
});

// @route   Create api/posts
// @access  Private route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Destructoring-pulling errors and isValid from validatePostInput
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // new construtor of Post Schema model
    const newPost = new Post({
      text: req.body.text,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      //   avatar: req.body.avatar,
      user: req.user.id
    });

    // save post to database
    newPost.save().then(post => res.status(200).json(post)); // response in JSON format
  }
);

// @route   DeleteById api/posts/:id
// @access  Private route
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find user and get profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Find by Id from profile
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner, users should only be able to delete their own posts

          // If post doesn't match to the user
          // post.user needs to be a string to compare to req.user.id
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // If so, then Delete
          post.remove().then(() => res.status(200).json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private route
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find user and get profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Find by Id from profile
      Post.findById(req.params.id)
        .then(post => {
          // Check to see if user already liked post(iterate through likes array with filter() to see if userId is present which means the user like the post)
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // If userId is not present, then Add userId to likes array
          post.likes.unshift({ user: req.user.id });

          // Save post to database
          post.save().then(post => res.status(200).json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private route
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find user and get profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Find by Id from profile
      Post.findById(req.params.id)
        .then(post => {
          // Check to see if user already liked post(iterate through likes array with filter() to see if userId is present which means the user like the post)
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // If userId is present, then Remove userId from likes array
          // Find user that we want to remove
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array to remove
          post.likes.splice(removeIndex, 1);

          // Save post to database
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   Post api/posts/comment/:id
// @access  Private route
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Destructoring-pulling errors and isValid from validatePostInput
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Find by Id, get post
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          //   avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comment array
        post.comments.unshift(newComment);

        // Save comment to database
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @access  Private route
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find by Id, get post
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists

        // If comment doesn't exist
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // If comment exists
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array to delete
        post.comments.splice(removeIndex, 1);

        // Save post to database
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
