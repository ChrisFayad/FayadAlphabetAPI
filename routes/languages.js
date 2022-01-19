const express = require('express');
const { getAllLanguages, getLanguage, createLanguage, createNonLatinLanguage, modifyLanguage, deleteLanguage } = require('../controllers/languages');
const languageValidator = require('../validation/languageValidator');
const validationSchema = require('../validation/languageValidationSchema');

const router = express.Router();

router.get('/', getAllLanguages);

router.post('/', languageValidator(validationSchema.latinLanguage), createLanguage);

router.post('/nonLatin', languageValidator(validationSchema.nonLatinLanguage), createNonLatinLanguage);

router.get('/:language', getLanguage);

router.patch('/', modifyLanguage);

router.delete('/', deleteLanguage);

module.exports = router;