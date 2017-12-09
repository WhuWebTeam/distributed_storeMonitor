module.exports = app => {
    app.get('/txxxxx/api/v1/home/index', 'home.index'); // index test
    app.get('/txxxxx/api/v1/home/config', 'home.configTest'); // config test
    app.get('/txxxxx/api/v1/home/database', 'home.databaseTest'); // database test
}