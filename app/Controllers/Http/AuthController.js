"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
  }

  async authenticate({ request, auth }) {
    const { username, password } = request.all();

    const token = await auth.attempt(username, password);

    return token;
  }
}

module.exports = AuthController;
