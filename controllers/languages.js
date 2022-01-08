const LanguageCharacters = require('../models/languageCharacters');

const getAllLanguages = async (req, res) => {
    try {
        const languages = await LanguageCharacters.find({});
        res.status(200).json(languages.languageName)
    } catch (error) {
        res.status(500).json({ msg: 'app could not retrieve data from database!' });
    }
};

const getLanguage = async (req, res) => {
    const languageQuery = req.query.language;
    try {
        const language = await LanguageCharacters.find({language: languageQuery});
        res.status(200).json(language);
    } catch (error) {
        res.status(404).json({ msg: `The ${languageQuery} Language is not found!` });
    }
};

const createLanguage = async (req, res) => {
    const newLanguage = new LanguageCharacters(req.body);
    try {
        await newLanguage.save();
        res.json(201).json(`The ${newLanguage.language} Language has been added!`);
    } catch (error) {
        res.status(400).json({msg: error});
    }
};

const modifyLanguage = async (req, res) => {
    const languageQuery = req.query.language;
    try {
        await LanguageCharacters.updateOne(
            {language: languageQuery},
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
        const removedLanguage = await LanguageCharacters.remove({language: languageQuery});
        res.status(200).json(removedLanguage);
    } catch (error) {
        res.status(404).json({ msg: `The ${languageQuery} Language is not found!` });
    }
};

module.exports = {getAllLanguages, getLanguage, createLanguage, modifyLanguage, deleteLanguage};