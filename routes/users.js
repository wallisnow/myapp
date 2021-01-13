const express = require('express');
const redisClient = require('../config/redis-client');
const router = express.Router();
const userdao = require("../dao/userDao");

router.get("/get", function (req, res, next) {
  console.log("Request body: " + req.body);
  let sqlStr = "select * from users";
  userdao.doQuery(sqlStr, "users info loaded", res);
});

router.get("/get/:id", function (req, res, next) {
  console.log("Request body: " + req.body);
  let userId = req.params.id;
  let sqlStr = "select * from users where user_id=" + userId;
  userdao.doQuery(sqlStr, "users info loaded", res);
});

router.post("/add", function (req, res, next) {
  console.log("Request body: " + req.body);
  let user = req.body.user;
  let user_type = req.body.user_type;
  let sqlStr = "insert into users(user,user_type) values('" + user + "','" + user_type + "')";
  userdao.doQuery(sqlStr, user_type + ' added', res);
});

router.delete("/delete", function (req, res, next) {
  console.log("Request body: " + req.body);
  let user_id = req.body.user_id;
  let sqlStr = "delete from users where user_id=" + user_id;
  userdao.doQuery(sqlStr, "user id: " + user_id + ' deleted', res);
});

router.post('/update', function (req, res, next) {
  console.log("Request body: " + req.body);
  const user_id = req.body.user_id;
  const user = req.body.user;
  const sqlStr = "update users set user='" + user + "' where user_id=" + user_id;
  userdao.doQuery(sqlStr, "user id: " + user_id + ' updated', res);
});

module.exports = router;


