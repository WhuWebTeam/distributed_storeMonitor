module.exports = app => {
    
    const BaseController = require('./baseController')(app);

    class Home extends BaseController{

        constructor(app) {
            super(app);
        }
        
        index() {
            this.ctx.body = this.generateResponse(200, 'index test successed');
        }
    }

    return Home;
}