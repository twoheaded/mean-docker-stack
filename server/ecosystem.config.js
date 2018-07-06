module.exports = {
    apps: [{
        name: "server",
        script: "bin/www",
        exec_mode: "cluster",
        instances: "max",
        instance_var: 'INSTANCE_ID',
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
};