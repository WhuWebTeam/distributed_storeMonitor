module.exports = app => {
    app.get('/txxxxx/api/v1/index/index', 'home.index'); // index test
    app.get('/txxxxx/api/v1/index/config', 'home.configTest'); // config test
    app.get('/txxxxx/api/v1/index/database', 'home.databaseTest'); // database test
}