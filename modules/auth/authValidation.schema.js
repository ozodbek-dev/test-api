// validationSchemas.js
const Joi = require('joi')

const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;

const usernamePattern = /^[a-z]+(-[a-z]+)*$/;

const userLoginSchema = Joi.object({
	password: Joi.string().required(),
	email: Joi.string().email().required(),
});

const userRegisterSchema = Joi.object({
	username: Joi.string().pattern(usernamePattern).required(),
	password: Joi.string().pattern(strongPasswordPattern).min(6).required(),
	email: Joi.string().email().required(),
});

module.exports =  { userLoginSchema, userRegisterSchema };
