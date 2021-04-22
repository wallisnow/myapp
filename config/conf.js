const fs = require('fs')
const path = require('path')
const configFile = path.resolve(process.env.REDIS_NETWORK_JSON || __dirname + '/redis_network.json')

const data = fs.readFileSync(configFile, 'UTF-8').toString()
const redisNetworkConf = JSON.parse(data)
console.log("Read config file:" + configFile.toString() + " ->")
console.log(redisNetworkConf)

module.exports = redisNetworkConf;