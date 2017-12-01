module.exports = app => {
    const Config = {
        cluster: {
            listen: {
                path: '',
                port: 7001,
                hostname: '',
            }
        }
    };

    Config.database = {
        pg: {
            user: 'wesine_lpssystem',
            password: '123wesinesystem',
            database: 'wesinesystem',
            host: '121.201.13.217',
            port: '25432',
            poolSize: 20
        }
    };

    Config.userLevel = {
        manager: 1,
        storeManager: 2,
        districtManager: 3
    };

    Config.time = {
        graphShowTime: '6 m',
    }

    return Config;
}