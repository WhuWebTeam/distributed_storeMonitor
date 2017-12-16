module.exports = app => {
    app.get('/api/v1/token', 'home.testToken');
    app.get('/api/v1/index', 'home.index');

    app.get('/api/v1/pgpass', 'home.pgpass');
    app.get('/api/v1/tenantTableRegister', 'home.tenantTableRegister');
    app.get('/api/v1/testTenant', 'home.testTenant');
}