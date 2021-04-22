const Redis = require('ioredis');
const redisNetworkConf = require("./conf");

let client;

if (process.env.DEV_ENVIRONMENT === 'dev') {
    console.log("Using Singleton Type Redis...")
    client = new Redis(redisNetworkConf);
} else {
    console.log("Using Cluster Type Redis...")
    client = new Redis.Cluster(redisNetworkConf);
}

client.on('connect', function () {
    console.log("Redis Connected")
});

client.on('error', function (err) {
    console.log(err)
});

module.exports = client;