const fs = require('fs')
const path = require('path')
const configFile = path.resolve(process.env.REDIS_CLUSTER_NETWORK_JSON || __dirname + '/redis_cluster_network.json')

let redisClusterNetworkConf;

if (process.env.DEV_ENVIRONMENT !== 'dev') {
    const data = fs.readFileSync(configFile, 'UTF-8').toString()
    redisClusterNetworkConf = JSON.parse(data)
    console.log("Read config file:" + configFile.toString() + " ->")
    console.log(redisClusterNetworkConf)
}

const conf = {
    mysql: {
        host: process.env.DATABASE_HOST || "127.0.0.1",
        user: process.env.DATABASE_USER_NAME || "root",
        password: process.env.DATABASE_USER_PASSWORD || "root123",
        database: process.env.DATABASE_DB_NAME || "testdb",
        port: process.env.DATABASE_PORT || 3306,
    },
    redisCluster: redisClusterNetworkConf,
    redisSingleton: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
    }
};

module.exports = conf;