const router = require('express').Router();

router.get('/current', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout(); // delete-cookie()
  res.redirect('/');
});

module.exports = router;