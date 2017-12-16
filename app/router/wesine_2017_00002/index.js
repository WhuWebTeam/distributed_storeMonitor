

module.exports = app => {
    app.get('/wesine_2017_00002/api/v1/index/index', 'test.index'); // index test
    app.get('/wesine_2017_00002/api/v1/index/config', 'test.configTest'); // config test
    app.get('/wesine_2017_00002/api/v1/index/database', 'test.databaseTest'); // database test
}