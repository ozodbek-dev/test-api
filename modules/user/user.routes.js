const {
	changeRole,
	deleteMe,
	deleteUser,
	getMe,
	getSingleUser,
	updateMe,
	updateUser,
	changeMyPassword,
	getAllUsers,
	deleteUserByName,
} = require("./user.controller.js");

const routerReducer = require("../../shares/utils/routerReducer.js");
const { athorizeRoles, isAuthenticatedUser } = require("../../middlewares/auth.middlewares.js");

const userRoutes = routerReducer(router => {
	//user routes
	router.route("/get/me").get(isAuthenticatedUser, getMe);
	router.route("/update/me").put(isAuthenticatedUser, updateMe);
	router.route("/delete/me").delete(isAuthenticatedUser, deleteMe);
	router.route("/change/myPassword").put(isAuthenticatedUser, changeMyPassword);
	router.route("/get/all").get(isAuthenticatedUser, athorizeRoles("admin"), getAllUsers);

	router
		.route("/:id")
		.get(getSingleUser)
		.put(isAuthenticatedUser, athorizeRoles("admin"), changeRole)
		.delete(isAuthenticatedUser, athorizeRoles("admin"), deleteUser);

	router.route("/update/:id").put(isAuthenticatedUser, athorizeRoles("admin"), updateUser);
	
	router.route("/delete/user/:username").delete(isAuthenticatedUser, athorizeRoles("admin"), deleteUserByName);
});

module.exports =  userRoutes;
