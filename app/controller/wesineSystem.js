

module.exports = app => {
    
    const BaseController = require('./baseController')(app);

    class WesineSystem extends BaseController {

        constructor(app) {

            super(app);
        }


        async home() {
            this.ctx.redirect('/public/register.html');
        }


        async registerCompany() {
            
            const company = this.ctx.request.body;

            // company register wesine system
            if (!await this.service.wesineSystem._insert(company)) {
                this.ctx.body = this._generateResponse(403, 'register failed');
                return;
            }

            // register company to system url
            await this.service.tenant.tenantUrlRegist(company.id);

            // assinged database table to new company customer
            await this.service.tenant.tenantDatabaseAssigned(company.id);

            // generate token for new register company
            const token = Data.parse(new Date());
            if (!await this.service.wesineSystem._update({ token }, { id: company.id }))
            {
                await this.service.tenant.tenantUrlRetrieve(company.id);
                await this.service.tenant.tenantDatabaseRetrieve(company.id);
                this.ctx.body = this._generateResponse(403, 'register failed');
                return;
            }

            this.ctx.body = this._generateResponse(203, 'register successed');

        }        
    }

    return WesineSystem;
}