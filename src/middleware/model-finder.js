'use strict';

const user = require('../models/user-model.js');
const notification = require('../models/notification-model.js');
const request = require('../models/request-model');
// const offer = require('../models/offer-model');

// So the scheme is as following, user would include a specific role whether vendor, beneficiary or driver.
// The notifications facilitate what kinds of recieved alerts each would get.
// requests are according to beneficiary, which an array of unfilfilled requests ID are still around in an array within user data if not fulfilled 
// offers are according to vendors, which an array of unfilfilled requests ID are still around in an array within user data if not fulfilled

module.exports = (req, res, next) => {
  let model = req.params.model;

  switch(model) {
  case 'user':
    req.model = user;
    next();
    break;
  case 'notification':
    req.model = notification;
    next();
    break;
  case 'request':
    req.model = request;
    next();
    break;
  // case 'offer':
  //   req.model = offer;
  //   next();
  //   break;
  default:
    next('\
    Available models/routes are: \n\n\
    1- user \n\
    2- notificaiton \n\
    3- request \n\
    4- offer \n\
    ');
  }
};