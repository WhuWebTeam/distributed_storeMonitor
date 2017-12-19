/**
 * Service class releated business of tenant
 * @module tenant
 * @public
 * @since 1.0.0
 */


const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const path = require('path');

module.exports = app => {

    const BaseService = require('./baseService')(app);

    class Tenant extends BaseService{

        /**
         * Constructor of class Tenant
         * @public
         * @constructor Tenant#constructor
         * @param {Object} app - egg application
         * @since 1.0.0 
         */
        constructor(app) {
            super(app);
        }


        /**
         * Set postgresql password for no passsword login
         * @private
         * @method Tenant#_pgpass
         * @return {Promise<Object>}
         * linux standard input and output stream info
         * @since 1.0.0
         */
        async _pgpass() {
            const shellPath = path.join(this.app.config.path.baseDir, './pgpass.sh');
            const pginfo = `${this.app.config.database.pg.host}:${this.app.config.database.pg.port}:*:${this.app.config.database.pg.user}:${this.app.config.database.pg.password}`;
            return await execFile(shellPath, [pginfo]);
        }


        /**
         * Generate all related url of tenant specified and register it to router.js
         * @public
         * @method Tenant#tenantUrlRegister
         * @param {String} telantCode - company user's register code
         * @return {Promsie<Object>}
         * linux standard input and output stream info
         * @since 1.0.0
         */
        async tenantUrlRegister(telantCode) {
            const shellPath = path.join(this.app.config.path.baseDir, './urlRegister.sh');
            return await execFile(shellPath, [telantCode]);
        }


        /**
         * Generate all related table of tenant specified to database
         * @public
         * @method Tenant#tenantTableRegister
         * @param {String} tenantCode - company user's register code
         * @return {Promise<Object>}
         * linux standard input and output stream
         * @since 1.0.0 
         */
        async tenantTableRegister(tenantCode) {
            const shellPath = path.join(this.app.config.path.baseDir, './tableRegister.sh');

            // ~/.pgpass file judge exists
            await this._pgpass();
            return await execFile(shellPath,
                [
                    this.app.config.database.pg.user,
                    this.app.config.database.pg.database,
                    this.app.config.database.pg.host,
                    this.app.config.database.pg.port,
                    tenantCode
                ]);
        }


        /**
         * Delete all related url of tenant specified
         * @public
         * @method Tenant#tenantUrlRetrieve
         * @param {String} tenantCode - company user's register code
         * @return {Promise<Object>}
         * linux standard input and output stream
         * @since 1.0.0
         */
        async tenantUrlRetrieve(tenantCode) {
            const shellPath = path.join(this.app.config.path.baseDir, './urlRetrieve.sh');
            return await execFile(shellPath, [this.app.config.path.baseDir, tenantCode]);
        }


        /**
         * Delete all table of tenant specified
         * @public
         * @method Tenant#tenantTableRetrieve
         * @param {String} tenantCode - company user's register code
         * @return {Promise<Object>}
         * linux standard input and output stream
         * @since 1.0.0
         */
        async tenantTableRetrieve(tenantCode) {
            const shellPath = path.join(this.app.config.path.baseDir, './tableRetrieve.sh');

            // ~/.pgpass file judge exists
            this._pgpass();
            return await execFile(shellPath,
                [
                    this.app.config.database.pg.user,
                    this.app.config.database.pg.database,
                    this.app.config.database.pg.host,
                    this.app.config.database.pg.port,
                    tenantCode
                ]);
        }
    }

    return Tenant;
}