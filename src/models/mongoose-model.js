'use strict';
/**
 * mongoDB Class to contain all related oprations to use in mongoose 
 */
class Model {
  constructor(schema) {
    this.schema = schema;
  }
  /**
   * creates the record object as a new mongoose entry
   * @param {Object} record is a an object specific to the schema
   */
  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  /**
   * get the specified ID from mongoose database, otherwise get all entries
   * @param {String} _id is a mongoose generated ID attached to each entry
   */
  get(_id) {
    return _id ? this.schema.find({_id}) : this.schema.find({});
  }
  /**
   * updates the specified ID from mongoose database with the object input
   * @param
   * @param {String} _id is a mongoose generated ID attached to each entry
   * @param {Object} record is an object specific to the schema
   */
  update(_id, record) {
    return _id ? this.schema.findByIdandUpdate(_id, record) : Promise.reject();
  }
  /**
   * deletes the specified ID from the mongoose database
   * @param {String} _id is a mongoose generated ID attached to each entry
   */
  delete(_id) {
    return _id ? this.schema.findByIdAndDelete({_id}) : Promise.reject();
  }
}

module.exports = Model;