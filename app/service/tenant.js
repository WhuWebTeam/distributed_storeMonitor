const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const path = require('path');

module.exports = app => {

    const BaseService = require('./baseService')(app);

    class Tenant extends BaseService{

        constructor(app) {
            super(app);
        }

        async newTenant(telantCode) {
            const shellPath = path.join(this.app.config.path.baseDir, './database.sh');
            const std = await execFile(shellPath, [telantCode]);
            console.log(std);
        }
    }

    return Tenant;
}