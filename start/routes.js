"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Route.on("/").render("welcome");
Route.get("/", "ContractController.index");

// Route.post("/register", "AuthController.register");
Route.group(() => {
  Route.get("login", "SessionController.create");
  Route.post("login", "SessionController.store");

  Route.get("register", "AuthController.create");
  Route.post("register", "AuthController.store");
}).middleware(["guest"]);

// Route.post("/authenticate", "AuthController.authenticate");
// Route.on("/login").render("session/create");
Route.group(() => {
  Route.get("contract/:id/info", "ContractController.info");
  Route.get("contract/pdf", "ContractController.pdf");
  Route.get("logout", "SessionController.delete");
  Route.get("company/:id/delete", "CompanyController.destroy");
  Route.resource("contract", "ContractController");
  Route.resource("company", "CompanyController");
}).middleware(["auth"]);
