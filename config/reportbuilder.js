'use strict'

const Env = use('Env')
/**     
 * Options to wkhtmltopdf
 * For more details on each configuration option see : https://wkhtmltopdf.org/usage/wkhtmltopdf.txt
 */
module.exports = {

  pageSize: Env.get('REPORT_PAGE_SIZE', 'A4'),

  orientation: Env.get('REPORT_PAGE_ORIENTATION', 'portrait'),

  footerFontSize: Env.get('REPORT_FOOTER_FONT_SIZE', 9),

  footerRight: Env.get('REPORT_FOOTER_RIGHT', 'Page: [page] from [topage]'),

  footerLeft: Env.get('REPORT_FOOTER_LEFT', null),

  marginBottom: Env.get('REPORT_MARGIN_BOTTOM', 5),

  marginLeft: Env.get('REPORT_MARGIN_LEFT', 5),

  marginRight: Env.get('REPORT_MARGIN_RIGHT', 5),

  marginTop: Env.get('REPORT_MARGIN_TOP', 5),
  
}
