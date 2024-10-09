// Import the validation middleware
const validateSchema = require('../../middlewares/validation.middleware.js');

// Import the router reducer utility
const routerReducer = require('../../shares/utils/routerReducer.js');

// Import authentication controller functions
const { login, logout, register } = require('./auth.controller.js');

// Import validation schemas
const { userLoginSchema, userRegisterSchema } = require('./authValidation.schema.js');

  const authRoutes = routerReducer((router)=>{
   router.route("/register").post(validateSchema(userRegisterSchema), register);
   router.route("/login").post(validateSchema(userLoginSchema), login);
   router.route("/logout").get(logout);
  }) 

module.exports =  authRoutes;