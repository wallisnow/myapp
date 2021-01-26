const conf = {
    mysql: {
        host: process.env.DATABASE_HOST || "127.0.0.1",
        user: process.env.DATABASE_USER_NAME || "root",
        password: process.env.DATABASE_USER_PASSWORD || "root123",
        database: process.env.DATABASE_DB_NAME || "testdb",
        port: process.env.DATABASE_PORT || 3306,
    },
    redisCluster: [
        {
            host: process.env.REDIS_NODE1_HOST,
            port: process.env.REDIS_NODE1_PORT || 6379,
        },
        {
            host: process.env.REDIS_NODE2_HOST,
            port: process.env.REDIS_NODE2_PORT || 6379,
        },
        {
            host: process.env.REDIS_NODE3_HOST,
            port: process.env.REDIS_NODE3_PORT || 6379,
        }
    ],
    redisSingleton: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
    }
};

module.exports = conf;