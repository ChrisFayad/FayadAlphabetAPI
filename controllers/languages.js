const { version } = require('mongoose');
const LanguageCharacters = require('../models/languageCharacters');

const getAllLanguages = async (req, res) => {
    try {
        const languages = await LanguageCharacters.find();
        res.status(200);
        languages.forEach(language => res.json(language.language));
    } catch (error) {
        res.status(500).json({ msg: 'app could not retrieve data from database!' });
    }
};

const getLanguage = async (req, res) => {
    try {
        const language = await LanguageCharacters.findOne({language: req.params.language});
        res.status(200).json(language);
    } catch (error) {
        res.status(404).json({ msg: `The ${languageQuery} Language is not found!` });
    }
};

const createLanguage = async (req, res) => {
    const newLanguage = new LanguageCharacters(req.body);

    try {
        await newLanguage.save();
        generateCharactersArrays(newLanguage);
        generateSpecialSymbols(newLanguage);
        res.status(201).json(`The ${newLanguage.language} Language has been added!`);
    } catch (error) {
        res.status(400).json({msg: `The Data is not valid, try again`});
    }
};

const modifyLanguage = async (req, res) => {
    const languageQuery = req.query.language;
    try {
        await LanguageCharacters.updateOne(
            { language: languageQuery },
            req.body
        );
        res.status(200).json(`The ${languageQuery} Language has been updated!`);
    } catch (error) {
        res.status(400).json({msg: error});
    }
};

const deleteLanguage = async (req, res) => {
    const languageQuery = req.query.language;
    try {
        await LanguageCharacters.deleteOne({language: languageQuery});
        res.status(200).json(`The ${languageQuery} Language has been deleted!`);
    } catch (error) {
        res.status(404).json({ msg: `The ${languageQuery} Language is not found!` });
    }
};

const generateCharactersArrays = async (language) => {
        const lowerAlphabet = language.lowerAlphabet;
        const primaryLowerAlphabet = [];
        const secondaryLowerAlphabet = [];
        const primaryLowerArray = [...lowerAlphabet.slice(0,5), ...lowerAlphabet.slice(9,14),
            ...lowerAlphabet.slice(18,22)];
        primaryLowerArray.forEach((letter) => {
            primaryLowerAlphabet.push({char: letter, code: letter.charCodeAt(0)});
        });
        const secondaryLowerAsciiArray = generateAsciiCharactersFormula(primaryLowerAlphabet);
        const secondaryLowerArray = [...lowerAlphabet.slice(5,9), ...lowerAlphabet.slice(14,18),
            ...lowerAlphabet.slice(22,26)];
        secondaryLowerArray.forEach((letter, index) => {
            secondaryLowerAlphabet.push({char: letter, code: secondaryLowerAsciiArray[index]});
        });
        const capsAlphabet = language.capsAlphabet;
        const primaryCapsAlphabet = [];
        const secondaryCapsAlphabet = [];
        const primaryCapsArray = [...capsAlphabet.slice(0,5), ...capsAlphabet.slice(9,14),
            ...capsAlphabet.slice(18,22)];
        primaryCapsArray.forEach((letter) => {
            primaryCapsAlphabet.push({char: letter, code: letter.charCodeAt(0)});
        });
        const secondaryCapsAsciiArray = generateAsciiCharactersFormula(primaryCapsAlphabet);
        const secondaryCapsArray = [...capsAlphabet.slice(5,9), ...capsAlphabet.slice(14,18),
            ...capsAlphabet.slice(22,26)];
        secondaryCapsArray.forEach((letter, index) => {
            secondaryCapsAlphabet.push({char: letter, code: secondaryCapsAsciiArray[index]});
        });
        await LanguageCharacters.updateOne(
                { language: language.language },
                { $set: {
                            primaryLowerAlphabet: primaryLowerAlphabet,
                            secondaryLowerAlphabet: secondaryLowerAlphabet,
                            primaryCapsAlphabet: primaryCapsAlphabet,
                            secondaryCapsAlphabet: secondaryCapsAlphabet,
                    } }
            );
        const  upToDateLanguage = await LanguageCharacters.findOne({language: language.language});
        generateNumberAbbreviations(upToDateLanguage);
};

const generateAsciiCharactersFormula = (primaryAlphabet) => {
    const secondaryAsciiCodeArray = [];
    for (let i = 0; i < primaryAlphabet.length; i++) {
        if (i < 4) {
            const charactersFormula = ((primaryAlphabet[i].code + primaryAlphabet[i+1].code) / 2) + primaryAlphabet[i].code;
            secondaryAsciiCodeArray.push(charactersFormula);
        }
        else if (i > 4 && i < 9) {
            const charactersFormula = ((primaryAlphabet[i].code + primaryAlphabet[i+1].code) / 2) + primaryAlphabet[i].code;
            secondaryAsciiCodeArray.push(charactersFormula);
        }
        else if (i > 9 && i < 13) {
            const charactersFormula = ((primaryAlphabet[i].code + primaryAlphabet[i+1].code) / 2) + primaryAlphabet[i].code;
            secondaryAsciiCodeArray.push(charactersFormula);
        }
        else if ( i === 13) {
            const charactersFormula = ((primaryAlphabet[10].code + primaryAlphabet[13].code) / 2) + primaryAlphabet[10].code;
            secondaryAsciiCodeArray.push(charactersFormula);
        }
    }
    return secondaryAsciiCodeArray;
};

const generateSpecialSymbols = async (language) => {
    const firstKeypadLayer = language.firstKeypadLayer;
    const specialSymbols = language.specialSymbols;
    const specialSymbolFormula = [];
    const specialSymbolsObject = [];
    specialSymbols.forEach((symbol, index) => {
        if (symbol === "!") {
            specialSymbolFormula.push(Math.pow(firstKeypadLayer[9].charCodeAt(0),2));
        }
        if (symbol === "@") {
           specialSymbolFormula.push(Math.pow(firstKeypadLayer[10].charCodeAt(0),2));
        }
        if (symbol === "?") {
            specialSymbolFormula.push(Math.pow(firstKeypadLayer[11].charCodeAt(0),2));
        }
        specialSymbolsObject.push({ char: symbol, code: specialSymbolFormula[index]});
    });
    try {
        await LanguageCharacters.updateOne(
            { language: language.language },
            { $set: { specialSymbolsObject: specialSymbolsObject }}
        );
    } catch (error) {
        console.log(error);
    }
};

const generateNumberAbbreviations = async (language) => {
    const primaryLowerAlphabet = language.primaryLowerAlphabet;
    const numberAbbreviations = language.numberAbbreviations;
    const numberAbbreviationFormula = [];
    const numberAbbreviationsObject = [];
    numberAbbreviations.forEach((number, index) => {
        if (number === "K") {
            numberAbbreviationFormula.push(primaryLowerAlphabet[1].code + primaryLowerAlphabet[6].code + primaryLowerAlphabet[10].code);
        }
        if (number === "M") {
            numberAbbreviationFormula.push(primaryLowerAlphabet[2].code + primaryLowerAlphabet[7].code + primaryLowerAlphabet[11].code);
        }
        if (number === "B") {
            numberAbbreviationFormula.push(primaryLowerAlphabet[3].code + primaryLowerAlphabet[8].code + primaryLowerAlphabet[12].code);
        }
        if (number === "T") {
            numberAbbreviationFormula.push(primaryLowerAlphabet[4].code + primaryLowerAlphabet[9].code + primaryLowerAlphabet[13].code);
        }
        numberAbbreviationsObject.push({ char: number, code: numberAbbreviationFormula[index]});
    });
    await LanguageCharacters.updateOne(
        { language: language.language },
        { $set: { numberAbbreviationsObject: numberAbbreviationsObject }}
    );
};

module.exports = {getAllLanguages, getLanguage, createLanguage, modifyLanguage, deleteLanguage};