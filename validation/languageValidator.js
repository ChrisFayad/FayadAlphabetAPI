const Joi = require('joi');

const languageValidator = (validationSchema) => {
  return async (req, res, next) => {
    try {
      await validationSchema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message.split('\"')[2].trim();
      }
      res.status(422).send(errors);
    }
  }
};

module.exports = languageValidator;