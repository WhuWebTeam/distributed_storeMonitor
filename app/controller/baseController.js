

module.exports = app => {
    class BaseController extends app.Controller {

        constructor(app) {
            super(app);
        }


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


        _getCompanyId(queryString) {
            const url = this.ctx.request.url;
            const str = url.split('/');
            return str[1];
        }
    }

    return BaseController;
}