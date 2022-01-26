const mongoose = require('mongoose');

const apiDB = mongoose.createConnection(process.env.API_DB_CONNECTION);

const nonLatinLanguageCharactersSchema = mongoose.Schema({
    language: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true
    },
    Alphabet: {
        type: [],
        required: true,
        trim: true,
    },
    primaryAlphabet: [{
        char: String,
        code: Number
    }],
    secondaryAlphabet: [{
        char: String,
        code: Number
    }],
    firstKeypadLayer: {
        type: [],
        trim: true,
        default: ["٧", "٨", "٩", "٤", "٥", "٦", "١", "٢", "٣", "*", "٠", "#"],
    },
    secondKeypadLayer: {
        type: [],
        trim: true,
        default: ["002E", "0020", "0026", "227A", "227B", "232B", "002B", "2212", "003D", "00B0", "002F", "000A"]
    },
    thirdKeypadLayer: {
        type: [],
        trim: true,
        default: ["066A", "005F", "0027", "0028", "0029", "0024", "0022", "003A", "20AC", "060C", "061B", "00A3"],
    },
    fourthKeypadLayer: {
        type: [],
        trim: true,
        default: ["005C", "007C", "007E", "003C", "003E", "005E", "005B", "005D", "00A5", "007B", "007D", "0060"]
    },
    specialSymbols:{
        type: [],
        trim: true,
        default: ["!", "@", "؟"]
    },
    specialSymbolsObject: [{
        char: String,
        code: Number
    }],
    numberAbbreviations:{
        type: [],
        trim: true,
        default: ["ألف", "مليون", "مليار", "تريليون"]
    },
    numberAbbreviationsObject: [{
        char: String,
        code: Number
    }],
});

nonLatinLanguageCharactersSchema.path('language').validate(async (language) => {
    const languageCount = await apiDB.models.nonLatinLanguageCharacters.countDocuments({ language });
    return !languageCount;
}, `The language you are trying to insert already exists!`);

module.exports = apiDB.model('nonLatinLanguageCharacters', nonLatinLanguageCharactersSchema);