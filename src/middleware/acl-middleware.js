'use strict';
/**
 * verifies valid actions defined by user role
 * @param {String} action is a route middleware input to validated needed action permission
*/
module.exports = (action) => {
  return (req, res, next) => {
    console.log('Actions available ', req.user.token.actions);
    try {
      if (req.user.token.actions.includes(action)) {
        next();
      } else {
        next('Invalid Action');
      }
    } catch (e) {
      next('Invalid no actions specified!');
    }
  };
};
