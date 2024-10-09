const error = (err, req, res, next) => {
	// Set the default error status and message
	let statusCode = err.status || 500;
	let message = err.message || "Internal Server Error";

	if (error.code === 11000) {
		// Extract the duplicate field from the error message
        const duplicateField = Object.keys(error.keyValue)[0];
        message = `Duplicate value for field: ${duplicateField}. Please use a different value.`
        statusCode=400
	}

	console.log({
		success: false,
		statusCode,
		message,
		url: req.originalUrl, // Include the requested URL
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Stack trace only in dev
	});


	// Send the error response
	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
		url: req.originalUrl, // Include the requested URL
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Stack trace only in dev
	});
};

module.exports =  error;
