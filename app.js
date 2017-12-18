const PGP = require('pg-promise')();

module.exports = app => {

    // pg-promise
    app.db = PGP(app.config.database.pg);

    // store all company user's token whether token can show or not(true: can show, false: cann't)
    app.tokenShow = {};
}