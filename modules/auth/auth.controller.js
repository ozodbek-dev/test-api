// Import the ErrorConstructor utility
const ErrorConstructor = require("../../shares/utils/error_constructor.js");

// Import the catch_async_error middleware
const catch_async_error = require("../../middlewares/catch_async_errors.middleware.js");

// Import the User schema
const User = require("../user/user.schema.js");

 const register = catch_async_error(async (req, res, next) => {

	if (!req.body) {
		return next(new ErrorConstructor("Server xatoligi", 500));
	}
	 await User.create(req.body)
	res.status(201).send({ success: true, msg:"User have been created!" });
});
 const login = catch_async_error(async (req, res, next) => {
	const { password, email } = req.body;

	if (!password || !email) {
		return next(new ErrorConstructor("Email yoki Maxfiy so'z xato kiritildi!", 400));
	}
	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorConstructor("Bu nom bilan ro'yxatdan o'tilmagan", 404));
	}
	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorConstructor("Maxfiy so'z xato kiritildi!"), 401);
	}
	const token = await user.getJwtToken();
	res.cookie("token", token, { expire: 360000 + Date.now() });

	res.status(200).send({ success: true, token: token });
});

 const logout = catch_async_error(async (req, res, next) => {
	res.cookie("token", null, { expire: 360000 + Date.now(), httpOnly: true });
	res.status(200).json({
		success: true,
		msg: "Successful logged out!",
	});
});

module.exports = {
    logout, login, register,
}
