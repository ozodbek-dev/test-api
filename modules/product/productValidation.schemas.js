// validationSchemas.js
// validationSchemas.js
const Joi = require('joi')


const specificationSchema = Joi.object({
	name: Joi.string().required().messages({
		"string.empty": "Specification name is required",
		"any.required": "Specification name is required",
	}),
	value: Joi.string().required().messages({
		"string.empty": "Specification value is required",
		"any.required": "Specification value is required",
	}),
});

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const createProductSchema = Joi.object({
	name: Joi.string().min(5).max(100).required(),
	price: Joi.number().required(),
	description: Joi.string().max(500),
	specifications: Joi.array().items(specificationSchema).required().messages({
		"array.base": "Specifications must be an array",
		"array.includes": "Each specification must be an object with name and value",
		"any.required": "Specifications are required",
	}),
	inStock: Joi.number(),
	tags: Joi.string(),
});
const productIdsSchema = Joi.array()
	.items(Joi.string().pattern(objectIdRegex).required()) // Validate as MongoDB ObjectID
	.required()
	.messages({
		"array.base": "productIds must be an array",
		"array.includes": "Each productId must be a valid ObjectID",
		"string.pattern.base": "Each productId must be a valid MongoDB ObjectID",
		"any.required": "productIds is a required field",
  });
  
const deleteProductSchema = Joi.object({
  productIds: productIdsSchema
  })

const updateProductSchema = Joi.object({
	name: Joi.string().min(5).max(100),
	price: Joi.number(),
	description: Joi.string().max(500),
	specifications: Joi.array().items(specificationSchema).messages({
		"array.base": "Specifications must be an array",
		"array.includes": "Each specification must be an object with name and value",
	}),
	inStock: Joi.number(),
	tags: Joi.string(),
});
module.exports =  { createProductSchema, deleteProductSchema, updateProductSchema };
