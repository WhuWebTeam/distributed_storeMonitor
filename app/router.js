module.exports = app => {


    app.get('/', 'home.testTenant');

    require('./router/tenantTemplate/home')(app);
}