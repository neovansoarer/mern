const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');

const app = express();

passport.use(new GoogleStrategy(
  {
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(`access-token => ${accessToken}`);
    console.log(`refresh-token => ${refreshToken}`);
    console.log('profile =>', profile);
    console.log(`done => ${done}`);
  }
));

app.get('/', (req, res) => {
  res.send({ happy: 'hacking' });
});

app.get(
  '/auth/google', // user req toss
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback', // req + code => google => Real user data
  passport.authenticate('google') // can not get /auth/google/callback
);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));