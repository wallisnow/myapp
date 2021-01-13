const express = require('express');
const redisClient = require('../config/redis-client');
const router = express.Router();

router.post('/storage/:key', async (req, res) => {
    const { key } = req.params;
    const value = req.body.data;
    await redisClient.setAsync(key, JSON.stringify(value));
    return res.send('Success');
});

router.get('/storage/:key', async (req, res) => {
    const { key } = req.params;
    const rawData = await redisClient.getAsync(key);
    return res.json(JSON.parse(rawData));
});

router.get('/greeting', (req, res) => {
    return res.send('Hello redis storage');
});

module.exports = router;