const express = require('express');
const router = express.Router();
const sendEmail = require('../../utils/email');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const text = `
  <h1>You have received a new message on the uBooze Contact Form</h1>
  <h2>${name}</h2>
  <h3>${email}</h3>
  <p>${message}</p>
  `;

  try {
    await sendEmail({
      to: process.env.EMAIL_ADDRESS_CONTACT_FORM,
      subject: 'You have received a new uBooze Contact Form message',
      text,
    });

    res.json({
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: true,
    });
  }
});

module.exports = router;
