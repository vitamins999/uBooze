const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { NotFoundError } = require('objection');

// Get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.query();

    if (users.length === 0) {
      throw new NotFoundError(users);
    }
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

// Create a new user
router.post('/', async (req, res, next) => {
  const { username, password, email, firstName, lastName } = req.body;

  try {
    const user = await User.query().insert({
      username,
      password,
      email,
      firstName,
      lastName,
    });
    res.json(user);
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
