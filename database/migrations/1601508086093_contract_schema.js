"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ContractSchema extends Schema {
  up() {
    this.create("contracts", (table) => {
      table.increments();
      table
        .integer("hired")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("company");
      table.string("contract").notNullable();
      table.text("object", "longtext").notNullable();
      table.float("value_monthly").notNullable();
      table.date("finish_date").notNullable();
      table.string("modality").notNullable();
      table.string("supervisor").notNullable();
      table.string("status");
      table.string("additive");

      table.timestamps();
    });
  }

  down() {
    this.drop("contracts");
  }
}

module.exports = ContractSchema;
