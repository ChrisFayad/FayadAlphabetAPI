const express = require('express');
const { getAllLanguages, getLanguage, createLanguage, createNonLatinLanguage, modifyLanguage, deleteLanguage } = require('../controllers/languages');
const { validate } = require('express-validation');
const validationSchema = require('../validation/languageValidationSchema');
// const createValidator = require('../validation/languageValidator');

const router = express.Router();

router.get('/', getAllLanguages);

router.post('/', validate(validationSchema.latinLanguage, {}, { abortEarly: false }), createLanguage);

// router.post('/nonLatin', validate(validationSchema.nonLatinLanguage), createNonLatinLanguage);

router.get('/:language', getLanguage);

router.patch('/', modifyLanguage);

router.delete('/', deleteLanguage);

module.exports = router;