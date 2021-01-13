const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});
//return Joi.validate(data, schema);
/* try {
  await schema.validateAsync(req.body);
  next();
} catch (error) {
  res.status(400).send(error.details[0].message);
} */

module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
