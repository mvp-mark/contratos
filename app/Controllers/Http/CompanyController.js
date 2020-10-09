"use strict";

const Company = use("App/Models/Company");
const Contract = use("App/Models/Contract");
const { validateAll } = use("Validator");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with companies
 */
class CompanyController {
  /**
   * Show a list of all companies.
   * GET companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ view }) {
    const companys = await Company.all();
    // return companys
    return view.render("company.index", { companys: companys.toJSON(),titleHead:'Empresas Cadastradas' } );
  }

  /**
   * Render a form to be used for creating a new company.
   * GET companies/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    return view.render("company.create", {titleHead:'Cadastrar Empresa'});
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, session, request, response }) {
    const data = request.only([
      "name",
      "company_name",
      "cnpj",
      "address",
      "tel",
      "category",
    ]);

    const validation = await validateAll(data, {
      name: "required",
      company_name: "required",
      cnpj: "required",
      address: "required",
      tel: "required",
      category: "required",
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
    await currentUser.companys().create(data);

    return response.redirect("/");
  }
  /**
   * Display a single company.
   * GET companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing company.
   * GET companies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const company = await Company.findOrFail(params.id);

    return view.render("company.edit", { company: company.toJSON() });
  }

  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only([
      "name",
      "company_name",
      "cnpj",
      "address",
      "tel",
      "category",
    ]);

    /**
     * Validating our data.
     *
     * ref: http://adonisjs.com/docs/4.1/validator
     */
    const validation = await validateAll(data, {
      name: "required",
      company_name: "required",
      cnpj: "required",
      address: "required",
      tel: "required",
      category: "required",
    });

    /**
     * If validation fails, early returns with validation message.
     */
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();

      return response.redirect("back");
    }
    const company = await Company.findOrFail(params.id);
    company.merge(data);
    await company.save();

    return response.redirect("/");
  }

  /**
   * Delete a company with id.
   * DELETE companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const company = await Company.findOrFail(params.id);
    await company.delete();

    return response.redirect("/");
  }
}

module.exports = CompanyController;
