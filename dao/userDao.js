const conn = require("../config/connect");
const message = require("../config/message");

function doQuery(sqlStr, info, res) {
    let msg = new message();
    conn.query(sqlStr, function (err, result) {
        if (err) {
            console.log("database query error... ...");
            msg.setStatus(false).setMessage(err.message);
            res.send(msg);
        } else {
            console.log("loading data... ...");
            msg.setStatus(true).setMessage(info).setData(result);
            res.send(msg);
        }
    });
}

exports.doQuery = doQuery;