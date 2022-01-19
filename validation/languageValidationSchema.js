const Joi = require('joi');

const validationSchema = {
    latinLanguage: Joi.object({
            language: Joi.string().alphanum().required(),
            capsAlphabet: Joi.array().min(12).max(46).items(Joi.string().uppercase()),
            lowerAlphabet: Joi.array().min(12).max(46).items(Joi.string().lowercase()),
            firstKeypadLayer: Joi.array().min(0).max(12).items(Joi.string()),
            secondKeypadLayer: Joi.array().min(0).max(12).items(Joi.string()),
            thirdKeypadLayer: Joi.array().min(0).max(12).items(Joi.string()),
            fourthKeypadLayer: Joi.array().min(0).max(12).items(Joi.string()),
            specialSymbols: Joi.array().min(0).max(3).items(Joi.string().max(1)),
            numberAbbreviations: Joi.array().min(0).max(4).items(Joi.string()),
    }),
    nonLatinLanguage: Joi.object({
            language: Joi.string().alphanum().required(),
            Alphabet: Joi.array().min(28).max(49).items(Joi.string()).required(),
            firstKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(1)),
            secondKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(4)),
            thirdKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(4)),
            fourthKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(4)),
            specialSymbols: Joi.array().min(0).max(3).items(Joi.string().max(1)),
            numberAbbreviations: Joi.array().min(0).max(4).items(Joi.string())
    })
};

module.exports = validationSchema;