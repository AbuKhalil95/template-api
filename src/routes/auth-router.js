'use strict';

const express = require('express');
const router = express.Router();
const session = require('express-session');

const user = require('../models/user-model.js');
const basicAuth = require('../middleware/basic.js');
// const oAuth = require('../middleware/oauth.js');

router.post('/signup', postAuth);
router.post('/signin', basicAuth, verifyAuth);
// router.get('/oauth', oAuth, useOpenAuth);

router.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

// ---------------------------------------- Authorization Functions ---------------------------------------- //

function postAuth(req, res, next) {
  user.create(req.body).then(user => {
    res.status(200).send(user);
  }).catch(err => {
    console.log('error: ', err);
    next(err);
  });
}

function verifyAuth(req, res, next) {
  if (req.token) {
    res.cookie('token', req.token);
    res.cookie('userId', req.user._id);
    res.status(200).send({
      token: req.token,
      user: req.user,
    });
  } else {
    res.status(401).send('User does not exists!');
  }
}

// function useOpenAuth(req, res, next) {
//   res.status(200).send(req.token);
// }

module.exports = router;