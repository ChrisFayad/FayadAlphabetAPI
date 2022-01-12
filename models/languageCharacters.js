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
    primaryCapsAlphabet: [{
        char: String,
        code: Number
    }],
    secondaryCapsAlphabet: [{
        char: String,
        code: Number
    }],
    lowerAlphabet: {
        type: [],
        required: true
    },
    primaryLowerAlphabet: [{
        char: String,
        code: Number
    }],
    secondaryLowerAlphabet: [{
        char: String,
        code: Number
    }],
    firstKeypadLayer: {
        type: [],
        required: true
    },
    secondKeypadLayer: {
        type: [],
        default: ["002E", "0020", "0026", "227A", "227B", "232B", "002B", "2212", "003D", "00B0", "002F", "000A"]
    },
    thirdKeypadLayer: {
        type: [],
        default: ["0025", "005F", "0027", "0028", "0029", "0024", "0022", "003A", "20AC", "002C", "003B", "00A3"]
    },
    fourthKeypadLayer: {
        type: [],
        default: ["005C", "007C", "007E", "003C", "003E", "005E", "005B", "005D", "00A5", "007B", "007D", "0060"]
    },
    specialSymbols:{
        type: [],
        default: ["!", "@", "?"]
    },
    specialSymbolsObject: [{
        char: String,
        code: Number
    }],
    numberAbbreviations:{
        type: [],
        default: ["K", "M", "B", "T"]
    },
    numberAbbreviationsObject: [{
        char: String,
        code: Number
    }],
});

module.exports = mongoose.model('LanguageCharacters', LanguageCharactersSchema);