const { Joi, Segments } = require('celebrate');

// User validation rules
module.exports = {
  create: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              case 'string.base':
                err.message = `Email should be a string.`;
                break;
              case 'string.email':
                err.message = `Email should be valid.`;
                break;
              case 'any.required':
                err.message = `Email is required.`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      firstName: Joi.string()
        .max(5)
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              case 'string.base':
                err.message = `First name should be a string.`;
                break;
              case 'string.max':
                err.message = `First name should have at most ${err.local.limit} characters.`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      lastName: Joi.string()
        .max(128)
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              case 'string.base':
                err.message = `First name should be a string.`;
                break;
              case 'string.max':
                err.message = `Last name should have at most ${err.local.limit} characters.`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
    }),
  },
};
