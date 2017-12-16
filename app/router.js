

module.exports = app => {

    require('./router/wesineSystem')(app);
    require('./router/home')(app);
    require('./router/wesine_2017_00002/home')(app);
    require('./router/wesine_2017_00002/index')(app);
}