

module.exports = app => {

    require('./router/wesineSystem')(app);
    require('./router/home')(app);
}