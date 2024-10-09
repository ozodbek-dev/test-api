// Import the validation middleware
const validateSchema = require("../../middlewares/validation.middleware.js");

// Import the router reducer utility
const routerReducer = require("../../shares/utils/routerReducer.js");

// Import controller functions for products
const { update, create, deleteByIds, getAllProducts } = require("./product.controller.js");

// Import middleware for authentication and authorization
const { athorizeRoles, isAuthenticatedUser } = require("../../middlewares/auth.middlewares.js");

// Import validation schemas for products
const { createProductSchema, deleteProductSchema, updateProductSchema } = require("./productValidation.schemas.js");

const productRoutes = routerReducer(router => {
	//admin actions
	router.route("/create").post(isAuthenticatedUser, athorizeRoles("admin"), validateSchema(createProductSchema), create);
	router.route("/:id").put(isAuthenticatedUser, athorizeRoles("admin"), validateSchema(updateProductSchema), update);

	router.route("/delete").delete(isAuthenticatedUser, athorizeRoles("admin"), validateSchema(deleteProductSchema), deleteByIds);

	//common
	router.route("/get/all").get(getAllProducts);
});

module.exports =  productRoutes;
