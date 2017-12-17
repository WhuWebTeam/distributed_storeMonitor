

module.exports = app => {
    app.get('/12/api/v1/home/index', 'test.index'); // index test
    app.get('/12/api/v1/home/config', 'test.configTest'); // config test
    app.get('/12/api/v1/home/database', 'test.databaseTest'); // database test
}