const mongoose = require('mongoose');

const LanguageCharactersSchema = mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    capsAlphabet: {
        type: [String],
        required: true
    },
    lowerAlphabet: {
        type: [String],
        required: true
    },
    firstKeypadLayer: {
        type: [String],
        required: true
    },
    secondKeypadLayer: {
        type: [String],
        required: false
    },
    thirdKeypadLayer: {
        type: [String],
        required: false
    },
    fourthKeypadLayer: {
        type: [String],
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