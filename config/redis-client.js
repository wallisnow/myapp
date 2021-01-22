const Redis = require('ioredis');
const conf = require("./conf");

let client;

if (process.env.DEV_ENVIRONMENT === 'dev') {
    console.log("Using Singleton Type Redis...")
    client = new Redis(conf.redisSingleton);
} else {
    console.log("Using Cluster Type Redis...")
    client = new Redis.Cluster(conf.redisCluster);
}

client.on('connect', function () {
    console.log("Redis Connected")
});

client.on('error', function (err) {
    console.log(err)
});



module.exports = client;