

const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const path = require('path');

module.exports = app => {

    const BaseService = require('./baseService')(app);

    class Tenant extends BaseService{

        constructor(app) {
            super(app);
        }

        async pgpass() {
            const shellPath = path.join(this.app.config.path.baseDir, './pgpass.sh');
            const pginfo = `${this.app.config.database.pg.host}:${this.app.config.database.pg.port}:*:${this.app.config.database.pg.user}:${this.app.config.database.pg.password}`;
            const std = await execFile(shellPath, [pginfo]);
        }

        
        async tenantUrlRegister(telantCode) {
            const shellPath = path.join(this.app.config.path.baseDir, './urlRegister.sh');
            const std = await execFile(shellPath, [telantCode]);
        }

        
        async tenantTableRegister(tenantCode) {
            const shellPath = path.join(this.app.config.path.baseDir, './tableRegister.sh');
            const std = await execFile(shellPath, [telantCode]);
        }

        
        async tenantUrlRetrieve(tenantCode) {
            const shellPath = path.join(this.app.config.path.baseDir, './urlRetrieve.sh');
            const std = await execFile(shellPath, [tenantCode]);
        }


        async tenantTableRetrieve(tenantCode) {
            const shellPath = path.join(this.app.config.path.baseDir, './tableRetrieve.sh');
        }
    }

    return Tenant;
}