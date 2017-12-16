module.exports = app => {
    app.get('/api/v1/token', 'test.testToken');
    app.get('/api/v1/index', 'test.index');

    app.get('/api/v1/pgpass', 'test.pgpass');
    app.get('/api/v1/tenantTableRegister', 'test.tenantTableRegister');
    app.get('/api/v1/testTenant', 'test.testTenant');
}