module.exports = app => {
    app.get('/api/v1/token', 'test.testToken');
    app.get('/api/v1/index', 'test.index');

    app.get('/api/v1/pgpass', 'test.pgpass');
    app.get('/api/v1/tenantTableRegister', 'test.tenantTableRegister');
    app.get('/api/v1/testTenant', 'test.testTenant');
    app.get('/api/v1/cookie1', 'test.cookie1');
    app.get('/api/v1/cookie2', 'test.cookie2');
    app.get('/api/v1/tokenShow1', 'test.tokenShow1');
    app.get('/api/v1/tokenShow2', 'test.tokenShow2');  
    // app.get('/api/v1/deleteUser', 'test.deleteUser');
}