'use strict';

const users = require('../models/user-model.js');

module.exports = (req, res, next) => {
  if(!req.headers.authorization) {
    return next('Invalid login, no headers!');
  }

  let bearer = req.headers.authorization.split(' ');
  if (bearer[0] == 'Bearer') {
    const token = bearer[1];
    users.authenticate
  }
};