const apiUsers = require('../models/apiUsers');
require('dotenv/config');

const genKey = () => {
    return [...Array(30)]
        .map((char) => ((Math.random()* 36) | 0).toString(36))
        .join('');
};

const apiParams = (req) => {
    const today = new Date().toISOString().split('T')[0];
    return {
        apiKey: genKey(),
        usage: [{ date: today, count: 0 }]
    };
};

const authenticate = async (req, res, next) => {
    const host = req.header('Host');
    const apiKey = req.header('apiKey');
    const apiUser = await apiUsers.findOne({ host: host, apiKey: apiKey });
    if (apiUser) {
        const today = new Date().toISOString().split('T')[0];
        let usageIndex = apiUsers.where('usage.date').equals(today);

        if (usageIndex >= 0) {
            if (usageIndex.count >= process.env.API_MAX) {
                res.status(429).send({ msg: 'MAX API calls exceeded!' });
            } else {
                const updateCount = {
                    date: today,
                    count: usageIndex.count++
                }
                await apiUser.updateOne({ host, apiKey },
                    { $set: { usage: updateCount } });
                next();
            }
        } else {
            const newUsage = {
                date: today,
                count: 1
            };
            await apiUser.updateOne({ host, apiKey },
                { $set: { usage: newUsage } });
            next();
        }
    } else {
        res.status(403).send({ msg: 'Unauthorized!'});
    }
};

module.exports = { apiParams, authenticate };