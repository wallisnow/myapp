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
    redisCluster: redisClusterNetworkConf,
    redisSingleton: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
    }
};

module.exports = conf;