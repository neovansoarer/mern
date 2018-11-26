const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ happy: 'hacking' });
});

module.exports = router;