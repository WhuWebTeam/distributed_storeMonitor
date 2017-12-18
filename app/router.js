

module.exports = app => {

    require('./router/wesineSystem')(app);
    require('./router/test')(app);
    require('./router/q1/home')(app);
    require('./router/q1/index')(app);
    require('./router/w1/home')(app);
    require('./router/w1/index')(app);
}