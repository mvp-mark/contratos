"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Contract extends Model {
  user() {
    return this.belongsToMany("App/Models/User");
  }
  teste() {
    return this.belongsTo("App/Models/Company");
  
}
}

module.exports = Contract;
