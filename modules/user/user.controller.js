// Role=> user controllers;
const User = require("./user.schema.js");
const ErrorConstructor = require("../../shares/utils/error_constructor.js");
const catch_async_error = require("../../middlewares/catch_async_errors.middleware.js");
const getJWTDecodeData = require("../../shares/utils/getJwtDecodeData.js");

//User role controllers
const getMe = catch_async_error(async (req, res, next) => {
	const userId = await getJWTDecodeData(req, res, next);

	const user = await User.findById(userId).select("-password");

	if (!user) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi !", 404));
	}

	res.status(200).send({ success: true, user });
});

const updateMe = catch_async_error(async (req, res, next) => {
	const userId = await getJWTDecodeData(req, res, next);

	const { role, password, ...body } = req.body;

	const user = await User.findById(userId).select("-password");

	if (!user) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi !", 404));
	}
	const updatedUser = await User.findByIdAndUpdate(userId, body, {
		new: true,
	});
	res.status(200).send({ success: true, msg: "User Updated!" });
});

const getSingleUser = catch_async_error(async (req, res, next) => {
	const id = req.params.id;

	if (!id) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi!"), 404);
	}

	const user = await User.findById(id).select("-password");

	if (!user) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi !", 404));
	}
	res.status(200).send({ success: true, user });
});

const deleteMe = catch_async_error(async (req, res, next) => {
	const userId = await getJWTDecodeData(req, res, next);

	const user = await User.findById(userId).select("-password");

	if (!user) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi !", 404));
	}
	await User.findByIdAndDelete(userId);
	res.status(200).send({ success: true, msg: "Muvafaqqiyatli o'chirildi" });
});

const changeMyPassword = catch_async_error(async (req, res, next) => {
	const { newPassword, oldPassword } = req.body;
	const userId = await getJWTDecodeData(req, res, next);

	const user = await User.findById(userId).select("+password");
	if (!user) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi !", 403));
	}

	const isPasswordMatched = await user.comparePassword(oldPassword);
	if (!isPasswordMatched) {
		return next(new ErrorConstructor("Maxfiy so'z noto'g'ri kiritildi iltimos tekshirib qaytadan urining!"));
	}

	user.password = newPassword;
	await user.save();

	res.status(200).send({ success: true, msg: "Maxfiy so'z o'zgartirildi!" });
});

const getAllUsers = catch_async_error(async (req, res, _) => {
	const users = await User.find().select("-password");

	res.status(200).send({
		statusCode: 200,
		success: true,
		msg: "Successesfull!",
		data: {
			users,
			totalItems: users.length,
		},
	});
});

//Admin -- change userRole
const changeRole = catch_async_error(async (req, res, next) => {
	const id = req.params.id;

	if (!id) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi!"), 404);
	}

	const user = await User.findById(id).select("-password");

	if (!user) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi !", 403));
	}

	const updatedUser = await User.findByIdAndUpdate(id, { role: req.body.role }, { new: true }).select("-password");

	res.status(200).send({ success: true, msg: "Role have been changed!" });
});

const updateUser = catch_async_error(async (req, res, next) => {
	const id = req.params.id;

	if (!id) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi!, ro'yxatdan o'tilmagan"), 401);
	}
	const { role, rating, password, ...body } = req.body;
	const user = await User.findById(id);
	if (!user) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi !", 403));
	}

	await User.findByIdAndUpdate(id, body, {
		new: true,
	}).select("-password");
	res.status(200).send({ success: true, msg: "User updated!" });
});

const deleteUser = catch_async_error(async (req, res, next) => {
	const id = req.params.id;

	if (!id) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi!"), 404);
	}

	const user = await User.findById(id).select("-password");

	if (!user) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi !", 403));
	}
	await User.findByIdAndDelete(id);

	res.status(200).send({ success: true, msg: "Muvafaqqiyatli o'chirildi!" });
});

const deleteUserByName = catch_async_error(async (req, res, next) => {
	const username = req?.params?.username;

	if (!username) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi!"), 404);
	}
	await User.deleteMany({ username });
	res.status(200).send({ success: true, msg: "Muvafaqqiyatli o'chirildi!" });
});

module.exports = {
	deleteUser,
	updateUser,
	changeRole,
	getAllUsers,
	changeMyPassword,
	deleteMe,
	getMe,
	updateMe,
	getSingleUser,
	deleteUserByName,
};
