const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: process.env.EMAIL_ADDRESS,
    from: process.env.EMAIL_ADDRESS,
    subject: `You have received a message from the ubooze contact form`,
    text: `${name} (${email}) has sent the following message: ${message}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.json({
        error: false,
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        error,
      });
    });
});

module.exports = router;
