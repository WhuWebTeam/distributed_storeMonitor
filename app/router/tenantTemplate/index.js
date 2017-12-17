

module.exports = app => {
    app.get('/tenantTemplate/api/v1/index/index', 'test.index'); // index test
    app.get('/tenantTemplate/api/v1/index/config', 'test.configTest'); // config test
    app.get('/tenantTemplate/api/v1/index/database', 'test.databaseTest'); // database test
}