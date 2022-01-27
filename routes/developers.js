const express = require('express');
const validator = require('../validation/validator');
const apiUserValidationSchema = require('../validation/apiUserValidationSchema');
const { getUser, createUser, modifyUser, deleteUser } = require('../controllers/apiUsers');

const router = express.Router();

router.get('/', getUser);

router.post('/', validator(apiUserValidationSchema), createUser);

router.patch('/', validator(apiUserValidationSchema), modifyUser);

router.delete('/', deleteUser);

module.exports = router;