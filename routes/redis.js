const express = require('express');
const redis = require('../config/redis-client');
const router = express.Router();

async function initData() {
    await redis.set("test", "{\"foo\":\"bar\"}", function (err) {
        console.log(err)
    })
}

initData().then((value) => {
    console.log("init test key done")
})

router.post('/storage/:key', async (req, res) => {
    const {key} = req.params;
    const value = req.body.data;
    await redis.set(key, JSON.stringify(value))
        .then(console.log)
        .catch(console.error);
    return res.send('Success');
});

router.get('/storage/:key', async (req, res) => {
    const {key} = req.params;
    const rawData = await redis.get(key)
        .catch(console.error);
    return res.json(JSON.parse(rawData));
});

router.get('/greeting', (req, res) => {
    return res.send('Hello redis storage');
});

module.exports = router;