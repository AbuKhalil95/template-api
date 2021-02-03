'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const Model = require('./mongodb-model.js');

/**
 * defines actions specified for each role
 * might need more descriptive actions
 */

let roles = {
  vendor: ['read', 'create', 'update'],
  deliverer: ['read', 'create'],
  receiver: ['read', 'create', 'update'],
  admin: ['read', 'create', 'update', 'delete'],
};
/**
 * defines the static schema for all users
 */
const schema = mongoose.model('users', {
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  role: { type: String, required:true, enum: ['vendor', 'deliverer', 'receiver', 'admin']},
});
/**
 * a user class extended from mongoose Model 
 * that has all basic CRUD operations through _id
 */
class User extends Model {
  constructor() {
    super(schema);
  }
  /**
   * creates the record object as a new mongoose entry
   * @param {Object} record is a valid object following the user schema.
   */
  async create(record) {
    console.log('checking for', record.username);
    let userDB = await this.schema.findOne({ email: record.email });
    
    if (!userDB) {
      // saves user if it does not exists
      try {
        record.password = await bcrypt.hash(record.password, 5);
        console.log('new record: ', record);
      } catch(e) {
        console.log('error in bcrypt: ', e);
      }
      return super.create(record);
    } else {
      return 'User Exists!';
    }
  }
  /**
   * gets the specified ID from mongoose database
   * @param {User} user is the user data that would be authenticated.
   * @param {String} password is the password encrypted with bcrypt to be compared.
   */
  async authenticateBasic(user, password) {
    console.log('Authenticating');
    let userExists = await this.schema.findOne({ email: user });
    
    if (userExists) {
      let valid = await bcrypt.compare(password, userExists.password);
      console.log('valid? ',valid);
      return valid ? userExists : Promise.reject();
    }
    return 'Invalid Auth';
  }
  /**
   * generates and attaches a jwt token to the specified user.
   * @param {User} user is the user data that would have a token attached to.
   */
  generateToken(user) {
    let token = jwt.sign({
      email: user.email,
      actions: roles[user.role],
      userId: user._id,
    }, secret);
    return token;
  }
  /**
   * authenticates the token whevener needed
   * @param {Object} token will be comapred locally for quick and
   * streamlined authentication for every other request after singing 
   */
  async authenticateToekn(token) {
    try {
      token = jwt.verify(token, secret);
      let userExists = await this.schema.findOne({ email: tokenObject.email });

      if (userExists) {
        return Promise.resolve({
          token: token,
          user: userExists,
        });
      } else {
        return Promise.reject();
      }
    } catch(e) {
      return Promise.reject();
    }
  }
}

module.exports = new User;

