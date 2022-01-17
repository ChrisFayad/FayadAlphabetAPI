const express = require('express');
const { getAllLanguages, getLanguage, createLanguage, createNonLatinLanguage, modifyLanguage, deleteLanguage } = require('../controllers/languages');

const router = express.Router();

router.get('/', getAllLanguages);

router.post('/', createLanguage);

router.post('/nonLatin', createNonLatinLanguage);

router.get('/:language', getLanguage);

router.patch('/', modifyLanguage);

router.delete('/', deleteLanguage);

module.exports = router;