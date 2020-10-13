const jsonwebtoken = require('jsonwebtoken');

const issueJWT = (user) => {
  const ID = user.userID;
  const expiresIn = '30d';

  const payload = {
    sub: ID,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

module.exports = issueJWT;
