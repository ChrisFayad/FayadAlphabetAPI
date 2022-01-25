const Joi = require('joi');

const validationKeypadSchema = Joi.object({
    firstKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(1)),
    secondKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(4)),
    thirdKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(4)),
    fourthKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(4)),
    specialSymbols: Joi.array().min(0).max(3).items(Joi.string().max(1)),
    numberAbbreviations: Joi.array().min(0).max(4).items(Joi.string())
});

module.exports = validationKeypadSchema;