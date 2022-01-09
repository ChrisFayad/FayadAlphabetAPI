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
        res.status(201).json(`The ${newLanguage.language} Language has been added!`);
        await newLanguage.save();
    } catch (error) {
        res.status(400).json({msg: error});
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

const generateArrays = async (req, res) => {
    try {
        const language = await LanguageCharacters.findOne({language: req.params.language});
        const lowerAlphabet = language.lowerAlphabet;
        const primaryLowerAlphabet = [...lowerAlphabet.slice(0,5), ...lowerAlphabet.slice(9,14),
            ...lowerAlphabet.slice(18,22)];
        const secondaryLowerAlphabet = [...lowerAlphabet.slice(5,9), ...lowerAlphabet.slice(14,18),
            ...lowerAlphabet.slice(22,26)];
        const capsAlphabet = language.capsAlphabet;
        const primaryCapsAlphabet = [...capsAlphabet.slice(0,5), ...capsAlphabet.slice(9,14),
            ...capsAlphabet.slice(18,22)];
        const secondaryCapsAlphabet = [...capsAlphabet.slice(5,9), ...capsAlphabet.slice(14,18),
            ...capsAlphabet.slice(22,26)];
        await LanguageCharacters.updateOne(
                { language: req.params.language },
                { $set: {
                            primaryLowerAlphabet: primaryLowerAlphabet,
                            secondaryLowerAlphabet: secondaryLowerAlphabet,
                            primaryCapsAlphabet: primaryCapsAlphabet,
                            secondaryCapsAlphabet: secondaryCapsAlphabet,
                    } }
            );
        res.status(200).json(`The primary & secondary LowerAlphabet has been generated!`);
    } catch (error) {
        res.status(404).json({ msg: error });
    }
};

module.exports = {getAllLanguages, getLanguage, createLanguage, modifyLanguage, deleteLanguage, generateArrays};