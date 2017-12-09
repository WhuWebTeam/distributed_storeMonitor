module.exports = app => {
    class BaseService extends app.Service {

        // constructor(app) {
        //     super(app);
        // }

        generateResponse(status, data) {
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
    }

    return BaseService;
}