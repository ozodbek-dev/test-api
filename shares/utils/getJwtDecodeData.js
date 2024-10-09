require("../../config/loadDotEnv.js");
const jwt = require("jsonwebtoken");
async function getJWTDecodeData(req, res, next) {
	const { token } = req.cookies;
	if (!token) {
		return next(new ErrorConstructor("Foydalanuvchi topilmadi!"), 404);
	}
	const decodeData = await jwt.verify(token, process.env.JWT_SECRET);
	return decodeData.id;
}

module.exports = getJWTDecodeData;
