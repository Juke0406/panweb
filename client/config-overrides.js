module.exports = {
    webpack: function(config, env) {
        return config;
    },
    devServer: function(configFunction) {
        return function(proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);

            config.disableHostCheck = true;
            return config;
        };
    }
};