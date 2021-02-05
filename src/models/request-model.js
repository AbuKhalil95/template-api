'use strict';

const mongoose = require('mongoose');
const Model = require('./mongoose-model');

const schema = mongoose.model('request', {
  user_id: {type: String, required: true},
  desc: {type: String, required: true},
  req_time: {type: Date, default: Date.now()},
  products: {type: String, required: true},
  time_limit: {type: Date, default: Date.now() + 86400000},
  // target: {type: String, default: 'All'},
  seen_by: {type: Number, default: 0},
  likes: {type: Number, default: 0},
});

class Notification extends Model {
  constructor() {
    super(schema);
  }

  get(user_id) {
    console.log('reading user_id: ', user_id);
    return user_id ? this.schema.find({user_id}) : this.schema.find({});
  }
}

module.exports = new Notification;