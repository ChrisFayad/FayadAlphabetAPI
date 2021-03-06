const LatinLanguageCharacters = require('../models/latinLanguageCharacters');
const nonLatinLanguageCharacters = require('../models/nonLatinLanguageCharacters');
const { generateCharactersArrays, generateNonLatinCharactersArrays, generateSpecialSymbols } = require('../utils/languageUtils');

const getAllLanguages = async (req, res) => {
    try {
        let languages = [];
        const latinLanguages = await LatinLanguageCharacters.find();
        const nonLatinLanguages = await nonLatinLanguageCharacters.find();
        if (latinLanguages) {
            latinLanguages.forEach(language => languages.push(language.language)); 
        }
        if (nonLatinLanguages) {
            nonLatinLanguages.forEach(language => languages.push(language.language));
        }
        const response = {
            count: languages.length,
            languages: languages.map(language => {
                return {
                    language: language,
                    request: {
                        type: 'GET',
                        description: `Get ${language} language information...`,
                        url: `https://localhost:7000/languages/${language}`
                    }
                };
            })
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: 'app could not retrieve data from database!' });
    }
};

const getLanguage = async (req, res) => {
    try {
        let language = '';
        language = await LatinLanguageCharacters.findOne({language: req.params.language});
        if (!language) {
            language = await nonLatinLanguageCharacters.findOne({language: req.params.language});
        }  
        res.status(200).json(language);
    } catch (error) {
        res.status(404).json({ msg: `The ${languageQuery} Language is not found!` });
    }
};

const createLanguage = async (req, res) => {
    let newLanguage = new LatinLanguageCharacters(req.body);
    const secondKeypadUnicode = [];
    const thirdKeypadUnicode = [];
    const fourthKeypadUnicode = [];
    try {
        if (req.query.unicode === 'true') {
            const lowerUnicodeArray = [];
            const capsUnicodeArray = [];

            newLanguage.lowerAlphabet.forEach((char) => {
                lowerUnicodeArray.push(String.fromCharCode(parseInt(char, 16)));
            });
            newLanguage.capsAlphabet.forEach((char) => {
                capsUnicodeArray.push(String.fromCharCode(parseInt(char, 16)));
            });
            newLanguage.lowerAlphabet = lowerUnicodeArray;
            newLanguage.capsAlphabet = capsUnicodeArray;
        }
        newLanguage.secondKeypadLayer.forEach((char) => {
            secondKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.secondKeypadLayer = secondKeypadUnicode;
        newLanguage.thirdKeypadLayer.forEach((char) => {
            thirdKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.thirdKeypadLayer = thirdKeypadUnicode;
        newLanguage.fourthKeypadLayer.forEach((char) => {
            fourthKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.fourthKeypadLayer = fourthKeypadUnicode;
        generateCharactersArrays(newLanguage);
        await newLanguage.save();
        generateSpecialSymbols(newLanguage);
        res.status(201).json(`The ${newLanguage.language} Language has been added!`);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422).json({ msg: error.message.split(':')[2] });
        } else {
            res.status(500).json(error.message);
        }  
    }
};

const createNonLatinLanguage = async (req, res, next) => {
    let newLanguage = new nonLatinLanguageCharacters(req.body);
    const secondKeypadUnicode = [];
    const thirdKeypadUnicode = [];
    const fourthKeypadUnicode = [];
    try {
        newLanguage.secondKeypadLayer.forEach((char) => {
            secondKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.secondKeypadLayer = secondKeypadUnicode;
        newLanguage.thirdKeypadLayer.forEach((char) => {
            thirdKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.thirdKeypadLayer = thirdKeypadUnicode;
        newLanguage.fourthKeypadLayer.forEach((char) => {
            fourthKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.fourthKeypadLayer = fourthKeypadUnicode;
        generateNonLatinCharactersArrays(newLanguage);
        await newLanguage.save();
        generateSpecialSymbols(newLanguage);
        res.status(201).json(`The ${newLanguage.language} Language has been added!`);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422).json({ msg: error.message.split(':')[2] });
        } else {
            res.status(500).json(error.message);
        }  
    }
};

const modifyLanguage = async (req, res) => {
    const languageQuery = req.query.language;
    const { firstKeypadLayer, secondKeypadLayer,
        thirdKeypadLayer, fourthKeypadLayer,
        specialSymbols, numberAbbreviations } = req.body;
    try {
        let modifyLanguage = '';
        modifyLanguage = await LatinLanguageCharacters.updateOne(
            { language: languageQuery },
            { $set: { firstKeypadLayer: firstKeypadLayer,
            secondKeypadLayer: secondKeypadLayer,
            thirdKeypadLayer: thirdKeypadLayer,
            fourthKeypadLayer: fourthKeypadLayer,
            specialSymbols: specialSymbols,
            numberAbbreviations: numberAbbreviations } }
        );
        if (modifyLanguage.modifiedCount !== 1) {
            modifyLanguage = await nonLatinLanguageCharacters.updateOne(
                { language: languageQuery },
                { $set: { firstKeypadLayer: firstKeypadLayer,
                    secondKeypadLayer: secondKeypadLayer,
                    thirdKeypadLayer: thirdKeypadLayer,
                    fourthKeypadLayer: fourthKeypadLayer,
                    specialSymbols: specialSymbols,
                    numberAbbreviations: numberAbbreviations } }
            );
        }
        res.status(200).json(`The ${languageQuery} Language has been updated!`);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422).json({ msg: error.message.split(':')[2] });
        } else {
            res.status(500).json(error.message);
        }  
    }
};

const deleteLanguage = async (req, res) => {
    const languageQuery = req.query.language;
    try {
        let deleteLanguage = '';
        deleteLanguage = await LatinLanguageCharacters.deleteOne({language: languageQuery});
        if (deleteLanguage.deletedCount !== 1) {
            deleteLanguage = await nonLatinLanguageCharacters.deleteOne({language: languageQuery});
        }
        res.status(200).json(`The ${languageQuery} Language has been deleted!`);
    } catch (error) {
        res.status(404).json({ msg: `The ${languageQuery} Language is not found!` });
    }
};

module.exports = { getAllLanguages, getLanguage, createLanguage, createNonLatinLanguage, modifyLanguage, deleteLanguage };