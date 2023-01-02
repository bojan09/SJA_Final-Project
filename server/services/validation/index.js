// Validation
const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const model = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    repeatPassword: Joi.string().min(6).required(),
  });
  return model.validate(data);
};

const loginValidation = (data) => {
  const model = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return model.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
