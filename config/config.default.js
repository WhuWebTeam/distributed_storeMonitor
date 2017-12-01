module.exports = appInfo => {
    const Config = {
        keys: "wesine_lpssystem" + appInfo.name + Date.parse(new Date())
    }

    return Config;
}