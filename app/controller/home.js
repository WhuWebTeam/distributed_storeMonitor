module.exports = app => {
    
    const BaseController = require('./baseController')(app);

    class Home extends BaseController{

        constructor(app) {
            super(app);
        }
        

        index() {
            this.ctx.body = this.generateResponse(200, 'index test successed');
        }


        configTest() {
            this.ctx.body = this.generateResponse(200, this.app.config);
        }


        async databaseTest() {
            const str = 'select * from test';
            try {
                const tests = await this.app.db.query(str, []);
                this.ctx.body = this.generateResponse(200, tests);
            } catch (err) {
                this.ctx.body = this.generateResponse(400, 'database test failed');
            }
        }

        async testTenant() {
            await this.service.tenant.newTenant('wesine_2017_00001');
            this.ctx.body = {
                code: 200,
                data: 'add a new tenant successed'
            }
        }
    }

    return Home;
}