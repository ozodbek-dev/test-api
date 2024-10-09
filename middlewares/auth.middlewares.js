const catch_async_error = require("./catch_async_errors.middleware.js");
const jwt = require("jsonwebtoken");
const userSchema = require("../modules/user/user.schema.js");
const ErrorConstructor = require("../shares/utils/error_constructor.js");

const isAuthenticatedUser = catch_async_error(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) return next(new ErrorConstructor("Iltimos saytdan foydalanish uchun ro'yxatdan o'ting!"));
	const decodeData = jwt.verify(token, process.env.JWT_SECRET);
	const user = await userSchema.findById(decodeData.id);
	
	if (!user) next(new ErrorConstructor("Iltimos saytdan foydalanish uchun ro'yxatdan o'ting!"));

	req.user = user;
	next();
});

const athorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role))
			return next(new ErrorConstructor(`Role: ${req.user.role} is not allowed to access this resource`));
		next();
	};
};

// Export the functions
module.exports = {
	isAuthenticatedUser,
	athorizeRoles,
};
