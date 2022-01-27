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
    const today = new Date().toISOString().split('T')[0];
    const apiUser = await apiUsers.findOne({ apiKey: apiKey });
    if (apiUser && apiUser.host === host) {
        if (apiUser.usage[0].date === today) {
            let usageIndex = apiUser.usage[0];
            if (usageIndex) {
                if (usageIndex.count >= process.env.API_MAX) {
                    res.status(429).send({ msg: 'MAX API calls exceeded!' });
                } else {
                    let currentCount = parseInt(usageIndex.count + 1);
                    const updateCount = {
                        date: today,
                        count: currentCount
                    };
                    await apiUsers.updateOne({ apiKey: apiKey },
                        { $set: { usage: updateCount } });
                    next();
                }
            }
        } else {
                const newUsage = {
                    date: today,
                    count: 1
                };
                await apiUsers.updateOne({ apiKey: apiKey },
                    { $set: { usage: newUsage } });
                next();
            }
    } else {
        res.status(403).send({ msg: 'Unauthorized!'});
    }
};

module.exports = { apiParams, authenticate };