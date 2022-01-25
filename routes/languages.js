const express = require('express');
const { getAllLanguages, getLanguage, createLanguage, createNonLatinLanguage, modifyLanguage, deleteLanguage } = require('../controllers/languages');
const languageValidator = require('../validation/languageValidator');
const validationLanguageSchema = require('../validation/languageValidationSchema');
const validationKeypadSchema = require('../validation/keypadValidationSchema') ;

const router = express.Router();

router.get('/', getAllLanguages);

router.post('/', languageValidator(validationLanguageSchema.latinLanguage), createLanguage);

router.post('/nonLatin', languageValidator(validationLanguageSchema.nonLatinLanguage), createNonLatinLanguage);

router.get('/:language', getLanguage);

router.patch('/', languageValidator(validationKeypadSchema), modifyLanguage);

router.delete('/', deleteLanguage);

module.exports = router;