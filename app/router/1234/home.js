

module.exports = app => {
    app.get('/1234/api/v1/home/index', 'test.index'); // index test
    app.get('/1234/api/v1/home/config', 'test.configTest'); // config test
    app.get('/1234/api/v1/home/database', 'test.databaseTest'); // database test
}