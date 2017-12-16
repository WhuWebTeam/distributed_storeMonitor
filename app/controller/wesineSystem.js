

module.exports = app => {
    
    const BaseController = require('./baseController')(app);

    class WesineSystem extends BaseController {

        constructor(app) {

            super(app);
        }

        
        async home() {
            this.ctx.redirect('/public/companyUser/register.html');
        }


        async getCompany() {
            
            const id = this.ctx.params.companyId;
            const company = await this.service.wesineSystem._query({ id });

            this.ctx.body = this._generateResponse(200, company);
        }


        async getToken() { //--------------------------- just first one can see
            const id = this.ctx.params.companyId;
            const company = await this.service.wesineSystem._query(['token'], { id });

            if (company.token) {
                this.ctx.body = this._generateResponse(200, { token: company.token });
                return;
            }

            this.ctx.body = this._generateResponse(400, 'get company token failed');
        }


        async resetToken() { //------------------------- generate token
            const id = this.ctx.params.companyId;
            token = Date.parse(new Date()) + id;
            if (!await this.service.wesineSystem._update({ token }, { id })) {
                this.ctx.body = this._generateResponse(403, 'reset token successed');
                return;
            }
            
            this.ctx.body = this._generateResponse(203, 'reset token successed');
            this.ctx.redirect('/public/companyUser/token.html');
        }


        async register() { //-------------------- session, generate token
            
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
            const token = Data.parse(new Date()) + company.id;

            // update company token failed
            if (!await this.service.wesineSystem._update({ token }, { id: company.id }))
            {
                // delete failed register company
                await this.service.wesineSystem._delete({ id: company.id });
                
                // retrieve url from company registered failed
                // await this.service.tenant.tenantUrlRetrieve(company.id);
                
                // retrieve table from company registered failed
                // await this.service.tenant.tenantTableRetrieve(company.id);
                this.ctx.body = this._generateResponse(403, 'register failed');
                return;
            }

            this.ctx.body = this._generateResponse(203, 'register successed');
            this.ctx.redirect(`/public/companyUser/company.html?token=${token}`);
        }


        async signIn() { //------------------------------ session, 
            const company = this.ctx.request.body;

            // username and password left
            if (!company.id || !company.password) {
                this.ctx.body = this._generateResponse(403, 'username and password required');
                return;
            }

            // user doesn't exists
            if (!await this.service.wesineSystem.exists(company.id)) {
                this.ctx.body = this._generateResponse(403, 'user does not exist');
                return;
            }

            // password error
            const password = await this.service.wesineSystem._query(['password'], { id: company.id });
            if (password.password != company.password) {
                this.ctx.body = this._generateResponse(403, 'password error');
                return;
            }

            let token = await this.service.wesineSystem._query(['token'], { id: companyId });
            token = token.token;
            if (!token) {
                this.ctx.body = this._generateResponse(403, 'login failed');
                return;
            }

            // password right, login successed
            this.ctx.redirect(`/public/companyUser/company.html?token=${token}`);
        }


        async signOut() { //-------------------------------session

        }


        async deleteCompany() {//---------------------------session

        }
    }

    return WesineSystem;
}