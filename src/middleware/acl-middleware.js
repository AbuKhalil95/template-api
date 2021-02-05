'use strict';
/**
 * verifies valid actions defined by user role
 * @param {String} action is a route middleware input to validated needed action permission
*/
module.exports = (action) => {
  return (req, res, next) => {
    console.log('req.user.actions Actions available ', req.user.tokenObject.actions);
    try {
      if (req.user.tokenObject.actions.includes(action)) {
        next();
      } else {
        next('Invalid Action');
      }
    } catch (e) {
      next('Invalid no actions specified!');
    }
  };
};
