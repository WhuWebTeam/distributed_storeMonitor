const path = require('path');


module.exports = appInfo => {
    const Config = {
        keys: "wesine_lpssystem" + appInfo.name + Date.parse(new Date()),

        security: {
            csrf: {
                ignoreJSON: true
            }
        },

        name: appInfo.name,

        pkg: appInfo.pkg,

        rundir: path.join(appInfo.baseDir, `../${appInfo.name}Info/run`),

        logger: {
            dir: path.join(appInfo.baseDir, `../${appInfo.name}Info/log/logs`),
        },

        notfound: {
            pageUrl: '/public/404.html'
        }
    };

    Config.path = {
        baseDir: appInfo.baseDir,
        infoDir: path.join(appInfo.baseDir,  `../${appInfo.name}Info/info`),
        logDir: path.join(appInfo.baseDir, `../${appInfo.name}Info/log`),
    }

    Config.database = {
        pg: {
            user: 'wesine_lpssystem',
            password: '123wesinesystem',
            database: 'wesinesystem',
            host: '127.0.0.1',
            port: '5432',
            poolSize: 50
        }
    }

    Config.userLevel = {
        manager: 1,
        storeManager: 2,
        districtManger: 3
    };

    Config.time = {
        graphShowTime: '6 m',
    }

    return Config;
}