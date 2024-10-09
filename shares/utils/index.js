const { reducedModel } = require("./modelReducer.js");
const routerReducer = require("./routerReducer.js");
const ErrorConstructor = require("./error_constructor.js");

module.exports = {
	reducedModel,
	routerReducer,
	default: ErrorConstructor,
};
