const passport = require('passport');
const router = require('express').Router();

router.get(
  '/', // user req toss
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;