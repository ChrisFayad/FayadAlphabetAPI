const Joi = require('joi');

const createValidator = (validationSchema) => 
  (data) => {
    return Joi.validate(data, validationSchema, { abortEarly: false });
  }

module.exports = createValidator;