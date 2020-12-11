const jsonwebtoken = require('jsonwebtoken');

const issueJWT = (user) => {
  const ID = user.userID;
  const expiresIn = '30s';

  const payload = {
    sub: ID,
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return {
    token: signedToken,
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
