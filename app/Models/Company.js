"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Company extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
  hired() {
    return this.hasMany("App/Models/Contract");
  }
}

module.exports = Company
