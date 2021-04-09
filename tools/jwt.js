const jwt = require('jsonwebtoken'),
      createError = require('http-errors'),
      config = require('../config.json');

let getToken = user => {
  return jwt.sign({
    userId : user._id,
    username: user.username,
    displayName: user.displayName,
    // roles: user.roles
  }, config.jwt.secret,{
    expiresIn: config.jwt.expiry
  });
}

let checkToken = (req, res, next) => {
  let token = req.headers.authorization;

  if(token) {
    token = token.replace("Bearer ", "");

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if(err) {
        return next(createError(401,{
          success: false,
          message: 'Token is not valid'
        }));
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return next(createError(401, {
      success: false,
      message: "Auth token is not supplied"
    }));
  }
}

module.exports = {
  getToken,
  checkToken
}