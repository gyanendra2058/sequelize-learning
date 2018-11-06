const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

//passport stuff
const passport = require("passport");
const jwtStrategry = require("../config/jwt")
passport.use(jwtStrategry);
require('../auth/auth');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send({
    msg: 'Welcome to books api!'
  });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, {
        session: false
      }, async (error) => {
        if (error) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = {
          _id: user._id,
          email: user.email
        };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({
          user: body
        }, 'top_secret');
        //Send back the token to the user
        return res.json({
          token
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;