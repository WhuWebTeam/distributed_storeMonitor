/**
 * Base class of all controller class releated to database table
 * @module baseController
 * @since 1.0.0 
 */

module.exports = app => {
    class BaseController extends app.Controller {


        /**
         * Constructor of class BaseController 
         * @public
         * @constructor
         * @param {Object} app - egg application
         * @since 1.0.0
         */
        constructor(app) {
            super(app);
        }


        /**
         * Generate response body
         * @public
         * @method BaseController#_generateResponse
         * @param {Number} status - status code 
         * @param {Object} data - response body
         * @return {Object}
         * object with status code grater than 400 when request failed
         * object with status code less than 400 when request successed
         * @since 1.0.0
         */
        _generateResponse(status, data) {
            status = +status;
            if (status >= 400) {
                return {
                    code: status,
                    message: data
                };
            }
            return {
                code: status,
                data
            }
        }


        /**
         * Parse url belongs to which company
         * @public
         * @method BaseController#_getCompanyId
         * @param {String} queryString - request url
         * @return {String}
         * string of company id(company register code)
         * @since 1.0.0
         */
        _getCompanyId(queryString) {
            const url = this.ctx.request.url;
            const str = url.split('/');
            return str[1];
        }
    }

    return BaseController;
}