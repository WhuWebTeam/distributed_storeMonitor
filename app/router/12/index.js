

module.exports = app => {
    app.get('/12/api/v1/index/index', 'test.index'); // index test
    app.get('/12/api/v1/index/config', 'test.configTest'); // config test
    app.get('/12/api/v1/index/database', 'test.databaseTest'); // database test
}