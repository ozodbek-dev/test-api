// Load environment variables
require("./config/loadDotEnv.js");

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Import custom middleware
const { errorMiddleware } = require("./middlewares/index.js");
const  NotFoundMiddleware  = require("./middlewares/404.middelware.js");

// Import route modules
const authRoutes = require("./modules/auth/auth.routes.js");
const userRoutes = require("./modules/user/user.routes.js");
const productRoutes = require("./modules/product/product.routes.js");

// Import database connection and server connection
const connToServer = require("./config/server.js");
const connToDB = require("./config/db.js");

// Create an instance of the Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(morgan("dev")); // Log requests to the console

// Define routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

app.use(NotFoundMiddleware);

// Error handling middleware
app.use(errorMiddleware);

// Connect to the database
connToDB();

// Start the server
 server= connToServer(app);
module.exports =  app;
