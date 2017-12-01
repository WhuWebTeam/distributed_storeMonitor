const PGP = require('pg-promise')();

module.exports = app => {

    // pg-promise
    app.db = PGP(app.config.database.pg);
}