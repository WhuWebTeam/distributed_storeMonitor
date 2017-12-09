module.exports = app => {
    app.get('/wesine_2017_00001/api/v1/index/index', 'home.index'); // index test
    app.get('/wesine_2017_00001/api/v1/index/config', 'home.configTest'); // config test
    app.get('/wesine_2017_00001/api/v1/index/database', 'home.databaseTest'); // database test
}