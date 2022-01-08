const express = require('express');
const { getAllLanguages, getLanguage, createLanguage, modifyLanguage, deleteLanguage } = require('../controllers/languages');

const router = express.Router();

router.get('/', getAllLanguages);

router.post('/', createLanguage);

router.get('/', getLanguage);

router.patch('/', modifyLanguage);

router.delete('/', deleteLanguage);

module.exports = router;