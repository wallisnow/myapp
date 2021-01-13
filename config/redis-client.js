const redisClient = require('redis');
const {promisify} = require('util');
const conf = require("./conf");
const client = redisClient.createClient(conf.redis);

client.on('connect', function () {
    console.log("Redis Connected")
});

client.on('error', function (err) {
    console.log(err)
});

module.exports = {
    ...client,
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    keysAsync: promisify(client.keys).bind(client)
};