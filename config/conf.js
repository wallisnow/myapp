const conf = {
    mysql: {
        host: process.env.DATABASE_HOST || "127.0.0.1",
        user: process.env.DATABASE_USER_NAME || "root",
        password: process.env.DATABASE_USER_PASSWORD || "root123",
        database: process.env.DATABASE_DB_NAME || "testdb",
        port: process.env.DATABASE_PORT || 3306,
    },
    redis: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: process.env.REDIS_PORT || 6379,
    }
};

module.exports = conf;