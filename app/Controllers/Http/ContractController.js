"use strict";

const Contract = use("App/Models/Contract");
const Company = use("App/Models/Company");
const { validateAll } = use("Validator");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contracts
 */
class ContractController {
  /**
   * Show a list of all contracts.
   * GET contracts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // async index ({ request, response, view }) {
  // }
  async index({ view }) {
    /**
     * Fetch all posts inside our database.
     *
     * ref: http://adonisjs.com/docs/4.1/lucid#_all
     */
    const contracts = await Contract.all();

    /**
     * Render the view 'contracts.index'
     * with the contracts fetched as data.
     *
     * ref: http://adonisjs.com/docs/4.1/views
     */
    return view.render("contracts.index", { contracts: contracts.toJSON() });
  }
  /**
   * Render a form to be used for creating a new contract.
   * GET contracts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store({ auth, session, request, response }) {
    const data = request.only([
      "hired",
      "contract",
      "object",
      "value_monthly",
      "finish_date",
      "value_global",
      "modality",
      "supervisor",
      "status",
      "additive",
    ]);

    const validation = await validateAll(data, {
      hired: "required",
      contract: "required",
      object: "required",
      value_monthly: "required",
      finish_date: "required",
      value_global: "required",
      modality: "required",
      supervisor: "required",
      status: "required",
      additive: "required",
    });

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();

      return response.redirect("back");
    }

    /**
     * Creating a new post through the logged in user
     * into the database.
     *
     * ref: http://adonisjs.com/docs/4.1/lucid#_create
     */
    const currentUser = await auth.getUser();
    await currentUser.contracts().create(data);

    return response.redirect("/");
  }

  /**
   * Create/save a new contract.
   * POST contracts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({ request, response, view }) {
    const companys = await Company.all();
    return view.render(
      "contracts.create"
      // , { companys: companys.toJSON() }
    );
  }

  /**
   * Display a single contract.
   * GET contracts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing contract.
   * GET contracts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update contract details.
   * PUT or PATCH contracts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only([
      "hired",
      "contract",
      "object",
      "value_monthly",
      "finish_date",
      "value_global",
      "modality",
      "supervisor",
      "status",
      "additive",
    ]);

    /**
     * Validating our data.
     *
     * ref: http://adonisjs.com/docs/4.1/validator
     */
    const validation = await validateAll(data, {
      hired: "required",
      contract: "required",
      object: "required",
      value_monthly: "required",
      finish_date: "required",
      value_global: "required",
      modality: "required",
      supervisor: "required",
      status: "required",
      additive: "required",
    });

    /**
     * If validation fails, early returns with validation message.
     */
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();

      return response.redirect("back");
    }
    const contract = await Contract.findOrFail(params.id);
    contract.merge(data);
    await contract.save();

    return response.redirect("/");
  }

  /**
   * Delete a contract with id.
   * DELETE contracts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const contract = await Contract.findOrFail(params.id);
    await contract.delete();

    return response.redirect("/");
  }
}

module.exports = ContractController;
