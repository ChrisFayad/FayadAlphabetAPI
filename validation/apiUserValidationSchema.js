const Joi = require('joi');
require('dotenv/config');

const apiUserValidationSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    apiKey: Joi.string().min(30),
    host: Joi.string(),
    usages: [
        Joi.date().iso(),
        Joi.number().integer().max(parseInt(process.env.API_MAX))
    ]
});

module.exports = apiUserValidationSchema;