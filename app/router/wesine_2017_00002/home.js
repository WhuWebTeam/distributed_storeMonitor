

module.exports = app => {
    app.get('/wesine_2017_00002/api/v1/home/index', 'test.index'); // index test
    app.get('/wesine_2017_00002/api/v1/home/config', 'test.configTest'); // config test
    app.get('/wesine_2017_00002/api/v1/home/database', 'test.databaseTest'); // database test
}