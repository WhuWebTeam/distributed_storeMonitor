

module.exports = app => {
    
    const BaseController = require('./baseController')(app);

    class WesineSystem extends BaseController {

        constructor(app) {

            super(app);
        }


        async home() {
            this.ctx.redirect('/public/register.html');
        }


        async getCompany() {
            
            const id = this.ctx.params.companyId;
            const result = await this.service.wesineSystem._query({ id });

            if(!result.flag) {
                this.ctx.body = this._generateResponse(400, 'get company info failed');
                return;
            }

            this.ctx.body = this._generateResponse(200, result.Data[0]);
        }


        async getToken() {
            const id = this.ctx.params.companyId;


        }


        async registerCompany() {
            
            const company = this.ctx.request.body;

            // company register wesine system
            if (!await this.service.wesineSystem._insert(company)) {
                this.ctx.body = this._generateResponse(403, 'register failed');
                return;
            }

            // register company url to system
            // await this.service.tenant.tenantUrlRegister(company.id);

            // register company table to database
            // await this.service.tenant.tenantTableRegister(company.id);

            // generate token for new register company
            const token = Data.parse(new Date());

            // update company token failed
            if (!await this.service.wesineSystem._update({ token }, { id: company.id }))
            {
                // delete failed register company
                await this.service.wesineSystem._delete({ id: company.id });
                
                // retrieve url from company registered failed
                await this.service.tenant.tenantUrlRetrieve(company.id);
                
                // retrieve table from company registered failed
                await this.service.tenant.tenantTableRetrieve(company.id);
                this.ctx.body = this._generateResponse(403, 'register failed');
                return;
            }

            this.ctx.body = this._generateResponse(203, 'register successed');
        }


        async signIn() {

        }
    }

    return WesineSystem;
}