module.exports = app => {
    app.get('/wesine_2017_00001/api/v1/home/index', 'home.index'); // index test
    app.get('/wesine_2017_00001/api/v1/home/config', 'home.configTest'); // config test
    app.get('/wesine_2017_00001/api/v1/home/database', 'home.databaseTest'); // database test
}