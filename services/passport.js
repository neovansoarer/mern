const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');
const mongoose = require('mongoose');
const { User } = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id); // set-cookie(serialized(user.id))
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
    .catch(error => console.error(error.message));
});

passport.use(new GoogleStrategy(
  {
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id });
    if(existingUser) done(null, existingUser); // user 있음
    else { // user 없음
      const newUser = await new User({ googleID: profile.id }).save();
      done(null, newUser);
    }
  }
));