const mysql = require("mysql");
const conf = require("./conf");
let conn;

function connect() {
    conn = mysql.createConnection(conf.mysql);

    conn.connect(function (err) {
        if (err) {
            console.log("mysql db connection error: " + err.message);
            setTimeout(connect, 2000);
        }
    });

    conn.on("error", function (err) {
        console.log("mysql db error", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log("mysql db disconnected, retrying... ...");
            connect();
        } else {
            console.log("mysql db connected failed, error: " + err.message);
            throw err;
        }
    });
}

connect();

module.exports = conn;