const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/login', function (req, res, next) {
    console.log("Request body: " + req.body);
    const {username, password} = req.body
    const result = login(username, password)
    if (result) {
        req.session.username = username
        req.session.password = password
        console.log(" login succeed! ")
        return res.send('Hello ' + username);
    }else {
        return res.send('user: ' + username + ' login failed, please yor username and password');
    }
});

function login(username, password) {
    console.log(username + " is accessing the system...")
    return username === "admin" && password === "admin";
}

module.exports = router;
