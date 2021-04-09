const createHttpError = require('http-errors');

const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
  
const { getToken } = require('../../tools/jwt');


router.post('/login', async (req, res, next) => {
  const username = req.body.username, password = req.body.password;

  if (username && password) {
    const user = await mongoose.model('User').findOne({ username: req.body.username });

    if (user) {
      user.comparePassword(password, (err, match) => {
        if (err) return next(err);

        if (match) {
          res.json({
            success: true,
            token: getToken(user)
          });
        } else {
          next(createHttpError(404, { success: false, message: "Username or password mismatch"}));
        }
      });
    } else {
      next(createHttpError(404, { success: false, message: "Username or password mismatch" }));
    }
  } else {
    next(createHttpError(400, { success: false, message: "Username or password not supplied" }));
  }
});

module.exports = router;