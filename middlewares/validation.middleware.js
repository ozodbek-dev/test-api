// validate.js

function validateSchema(schema) {
	return (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			return res.status(400).json({
				message: "Validation error",
				details: error.details.map(err => ({
					message: err.message,
					path: err.path,
				})),
			});
		}
		next();
	};
}

module.exports = validateSchema;
