const path = require("path");
const { fileURLToPath } = require("url");
const { config } = require("dotenv");

if (process.env.NODE_ENV === "test") {
	config({ path: ".env.test" });
}else if (process.env.NODE_ENV === "production") {
	config({ path: ".env.production" });
} else {
  config({ path:".env.development" }); // Default .env
}

