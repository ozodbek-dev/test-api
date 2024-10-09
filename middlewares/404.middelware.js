const NotFoundMiddleware =  (req, res, next) => {
	const error = new Error(`Cannot find ${req.originalUrl} on this server`);
	error.status = 404;
	next(error); // Pass the error to the global error handler
}


module.exports =  NotFoundMiddleware;