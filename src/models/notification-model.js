'use strict';

const mongoose = require('mongoose');
const Model = require('./mongoose-model');

const schema = mongoose.model('notification', {
  text: {type: String, required: true},
  time: {type: Date, default: Date.now},
  user_id: {type: String, required: true},
  // importance: {type: Number},
  seen: {type: Boolean},
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