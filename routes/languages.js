const express = require('express');
const { authenticate } = require('../utils/apiUtils');
const { getAllLanguages, getLanguage, createLanguage, createNonLatinLanguage, modifyLanguage, deleteLanguage } = require('../controllers/languages');
const validator = require('../validation/validator');
const validationLanguageSchema = require('../validation/languageValidationSchema');
const validationKeypadSchema = require('../validation/keypadValidationSchema') ;

const router = express.Router();

router.get('/', authenticate, getAllLanguages);

router.post('/', authenticate, validator(validationLanguageSchema.latinLanguage), createLanguage);

router.post('/nonLatin', authenticate, validator(validationLanguageSchema.nonLatinLanguage), createNonLatinLanguage);

router.get('/:language', authenticate, getLanguage);

router.patch('/', authenticate, validator(validationKeypadSchema), modifyLanguage);

router.delete('/', authenticate, deleteLanguage);

module.exports = router;