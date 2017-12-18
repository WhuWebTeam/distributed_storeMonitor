

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

            this.ctx.body = this.__generateResponse(200, company);
        }


        // Get company user's token but just one chance
        async getToken() {

            const id = this.ctx.params.companyId;
            const company = await this.service.wesineSystem._query(['token'], { id });

            // query token code failed
            if (!company.token) {
                this.ctx.body = this.__generateResponse(400, 'get company token failed');
                return;
            }

            // token has been seen
            if (!this.__tokenShowGet(company.token)) {
                this.ctx.body = this.__generateResponse(400, 'token has been seen');
                return;
            }

            // hide token code to company user and first send to user 
            this.__tokenShowReset(company.token);
            this.ctx.body = this.__generateResponse(200, { token: company.token });
        }


        // Reset company user's token
        async resetToken() {

            // Generate user's token code
            const id = this.ctx.params.companyId;
            token = Date.parse(new Date()) + id;

            // update company user's token code failed
            if (!await this.service.wesineSystem._update({ token }, { id })) {
                this.ctx.body = this.__generateResponse(403, 'reset token successed');
                return;
            }
            
            // token update successed and set visibale to user
            this.__tokenShowSet(token);
            this.ctx.body = this.__generateResponse(203, 'reset token successed');
            this.ctx.redirect('/public/companyUser/token.html');
        }


        // Validate some company exists or not
        async existsCompany() {
            
            const companyId = this.ctx.params.companyId;
            const exists = await this.service.wesineSystem.exists(companyId);
            this.ctx.body = this.__generateResponse(200, { exists });
        }


        async register() { //-------------------- session
            
            const company = this.ctx.request.body;

            // generate token for new register company
            const token = Date.parse(new Date()) + company.id;
            company.token = token;

            // company register failed
            if (!await this.service.wesineSystem._insert(company)) {
                this.ctx.body = this.__generateResponse(403, 'register failed');
                return;
            }

            // register company url to system
            await this.service.tenant.tenantUrlRegister(company.id);

            // register company table to database
            await this.service.tenant.tenantTableRegister(company.id);

            // set token visible to company user
            this.__tokenShowSet(token);

            this.ctx.redirect(`/public/companyUser/company.html`);
        }


        async signIn() {
            const company = this.ctx.request.body;

            // username and password left
            if (!company.id || !company.password) {
                this.ctx.body = this.__generateResponse(403, 'username and password required');
                return;
            }

            // user doesn't exists
            if (!await this.service.wesineSystem.exists(company.id)) {
                this.ctx.body = this.__generateResponse(403, 'user does not exist');
                return;
            }

            // password error
            const password = await this.service.wesineSystem._query(['password'], { id: company.id });
            if (password.password != company.password) {
                this.ctx.body = this.__generateResponse(403, 'password error');
                return;
            }

            let token = await this.service.wesineSystem._query(['token'], { id: companyId });
            token = token.token;
            if (!token) {
                this.ctx.body = this.__generateResponse(403, 'login failed');
                return;
            }

            // password right, login successed
            this.ctx.cookies.set('token', token, {
                Number: 3 * 24 * 60 * 60 * 1000
            });
            this.ctx.cookies.set('userName', companyId, 10 * 24 * 60 * 60 * 1000);
            this.ctx.redirect(`/public/companyUser/company.html`);
        }


        async signOut() {

            // sign out user
            const userName = this.ctx.cookies.get('userName');
            if (userName)  {
                this.ctx.cookies.set('userName', null);
            }

            // redirect to home page
            this.ctx.redierct('/');
        }


        async deleteCompany() {

            // register company url to system
            await this.service.tenant.tenantUrlRetrieve(company.id);

            // register company table to database
            await this.service.tenant.tenantTableRetrieve(company.id);

            this.ctx.body = this.__generateResponse(203, 'delete company user successed');
        }
    }

    return WesineSystem;
}