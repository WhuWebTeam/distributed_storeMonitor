

module.exports = app => {
    app.get('/tenantTemplate/api/v1/home/index', 'test.index'); // index test
    app.get('/tenantTemplate/api/v1/home/config', 'test.configTest'); // config test
    app.get('/tenantTemplate/api/v1/home/database', 'test.databaseTest'); // database test
}