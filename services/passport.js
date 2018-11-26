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
  (accessToken, refreshToken, profile, done) => {
    let user = User.findOne({ googleID: profile.id })
      .then(existingUser => {
        if(existingUser) { // User exists
          done(null, existingUser);
        } else { // New user
          new User({ googleID: profile.id })
            .save()
            .then(newUser => done(null, newUser))
            .catch(error => console.error(error.message));
        }
      })
      .catch(error => console.error(error.message));
  }
));