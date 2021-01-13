const conf = {
    mysql: {
        host: process.env.DATABASE_HOST || "localhost",
        user: process.env.DATABASE_USER_NAME || "root",
        password: process.env.DATABASE_USER_PASSWORD || "root123",
        database: process.env.DATABASE_DB_NAME || "testdb",
        port: process.env.DATABASE_PORT || 3306,
    }
};

module.exports = conf;