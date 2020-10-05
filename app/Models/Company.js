"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Company extends Model {
  user() {
    return this.belongsToMany("App/Models/User");
  }
  contract() {
    return this.belongsToMany("App/Models/Contract");
  }
}

module.exports = Company
