

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


        // async register() {
            
        //     const company = this.ctx.request.body;

        //     if ()
        // }        
    }

    return WesineSystem;
}