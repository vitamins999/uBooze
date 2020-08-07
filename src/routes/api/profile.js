const express = require('express');
const router = express.Router();

// Get profile info on current user
router.get('/', (req, res) => {
  res.send({
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    displayName: req.user.displayName,
  });
});

module.exports = router;
