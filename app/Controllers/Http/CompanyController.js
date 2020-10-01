'use strict'

const Company = use("App/Models/Company");
const Contract = use("App/Models/Contract");
const { validateAll } = use('Validator')

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
  async index (
    { request, response, view }
    ) {
    const contracts = await Contract.all();

    return view.render('contract.index', { contracts: contracts.toJson()});
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
  async create ({ request, response, view }) {

    return view.render('company.create')
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, session, request, response }) {
    const data = request.only(['name','company_name', 'cnpj','address','tel'])

    const validation = await validateAll(data, {
      name: 'required',
      company_name: 'required',
      cnpj: 'required',
      address: 'required',
      tel: 'required',
    })

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    /**
     * Creating a new post through the logged in user
     * into the database.
     *
     * ref: http://adonisjs.com/docs/4.1/lucid#_create
     */
    const currentUser = await auth.getUser()
    await currentUser.companys().create(data)

    return response.redirect('/')
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
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing company.
   * GET companies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a company with id.
   * DELETE companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CompanyController
