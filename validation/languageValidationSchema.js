const Joi = require('joi');

const validationSchema = {
    latinLanguage: {
        body: Joi.object({
            language: Joi.string().required(),
            capsAlphabet: Joi.array().min(12).max(46).items(Joi.string().uppercase()),
            lowerAlphabet: Joi.array().min(12).max(46).items(Joi.string().lowercase()),
            firstKeypadLayer: Joi.array().min(0).max(12).items(Joi.string()), //number
            secondKeypadLayer: Joi.array().min(0).max(12).items(Joi.string()), //unicode
            thirdKeypadLayer: Joi.array().min(0).max(12).items(Joi.string()), //unicode
            fourthKeypadLayer: Joi.array().min(0).max(12).items(Joi.string()), //unicode
            specialSymbols: Joi.array().min(0).max(3).items(Joi.string().max(1)),
            numberAbbreviations: Joi.array().min(0).max(4).items(Joi.string()),
        })
    },
    // nonLatinLanguage: {
    //     language: Joi.string().required(),
    //     Alphabet: Joi.array().min().max(49).items(Joi.string()).required(),
    //     firstKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(1)), //number
    //     secondKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(4)), //unicode
    //     thirdKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(4)), //unicode
    //     fourthKeypadLayer: Joi.array().min(0).max(12).items(Joi.string().max(4)), //unicode
    //     specialSymbols: Joi.array().min(0).max(3).items(Joi.string().max(1)),
    //     numberAbbreviations: Joi.array().min(0).max(4).items(Joi.string()),
    // }
};

module.exports = validationSchema;