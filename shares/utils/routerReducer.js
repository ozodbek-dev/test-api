const { Router } = require("express");

module.exports = function (cb) {
	const router = Router();
	cb(router);
	return router;
};
