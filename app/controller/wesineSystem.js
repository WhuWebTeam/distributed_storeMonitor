

module.exports = app => {
    
    const BaseController = require('./baseController')(app);

    class WesineSystem extends BaseController {

        constructor(app) {

            super(app);
        }


        async home() {
            let i = 1;
            this.ctx.redirect('/public/register.html');
        }


        async register() {
            
            const company = this.ctx.request.body;

            // company has existed in wesine system
            if (company.id && await this.service.wesineSystem.exists(company.id)) {
                this.ctx.body = this._generateResponse(403, 'register a new company failed');
                return;
            }


        }        
    }

    return WesineSystem;
}