'use strict';

const base64 = require('base-64');
const user = require('../models/user-model.js');

module.exports = (req, res, next) => {
  console.log('Headers: ', req.headers.authorization);
  const [authHeader, authInfo] = req.headers.authorization.split(' ');

  if(authHeader == 'Basic') {
    console.log('Doing Basic Auth...');
    const [email, password] = base64.decode(authInfo).split(':');

    user.authenticateBasic(email, password).then(validuser => {
      let token = user.generateToken(validuser);
      req.token = token;
      req.user = validuser;
      console.log('Tokenized and done...');
      next();
    }).catch(err => next(err));
  } else {
    next('Invalid Headers!');
  }
};