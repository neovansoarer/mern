const router = require('express').Router();

router.get('/current', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout(); // delete-cookie()
  res.send({
    message: 'You signed out successfully',
    user: req.user
  });
});

module.exports = router;