const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // find User by id
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user); // return user if true, note we use null instead of err
          }
          return done(null, false); // return false if not found
        })
        .catch(err => console.log(err));
    })
  );
};
