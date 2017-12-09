module.exports = app => {

    app.get('/', 'home.testTenant');
    require('./router/wesine_2017_00001/home')(app);
    require('./router/wesine_2017_00001/index')(app);
}