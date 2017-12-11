module.exports = app => {

    app.get('/', 'home.testTenant');
    app.get('/wesine_2017_0001/api/v1/queryString', 'home.queryString');
}