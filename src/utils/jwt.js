const jsonwebtoken = require('jsonwebtoken');

const issueJWT = (user) => {
  const ID = user.userID;
  const expiresIn = '10s';

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

const issueRefreshJWT = (user) => {
  const ID = user.userID;
  const expiresIn = '30d';

  return jsonwebtoken.sign({ userID: ID }, process.env.JWT_REFRESH_SECRET, {
    expiresIn,
  });
};

module.exports = { issueJWT, issueRefreshJWT };
