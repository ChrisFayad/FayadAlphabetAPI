const mongoose = require('mongoose');

const LanguageCharactersSchema = mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    capsAlphabet: {
        type: [],
        required: true
    },
    primaryCapsAlphabet: [],
    secondaryCapsAlphabet: [],
    lowerAlphabet: {
        type: [],
        required: true
    },
    primaryLowerAlphabet: [],
    secondaryLowerAlphabet: [],
    firstKeypadLayer: {
        type: [],
        required: true
    },
    secondKeypadLayer: {
        type: [],
        required: false
    },
    thirdKeypadLayer: {
        type: [],
        required: false
    },
    fourthKeypadLayer: {
        type: [],
        required: false
    },
    specialSymbols: [{
        char: String,
        code: Number
    }],
    numberAbbreviations: [{
        char: String,
        code: Number
    }],
});

module.exports = mongoose.model('LanguageCharacters', LanguageCharactersSchema);