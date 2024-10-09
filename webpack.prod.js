const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin"); // Use Terser instead of UglifyJsPlugin

module.exports = {
	entry: {
		main: "./index.js",
	},
	stats: {
		warnings: false,
	},
	output: {
		path: path.join(__dirname, "prod-build"),
		publicPath: "/",
		filename: "index.js",
		clean: true,
	},
	mode: "production",
	target: "node",
	externals: [nodeExternals()],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				// Using Terser for minification
				test: /\.min\.js$/,
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						// You can specify babel options here if needed
					},
				},
			},
		],
	},
	resolve: {
		fallback: {
			// Add any necessary polyfills for Node.js core modules
			crypto: require.resolve("crypto-browserify"),
			path: require.resolve("path-browserify"),
			url: require.resolve("url/"),
			buffer: require.resolve("buffer/"),
			zlib: require.resolve("browserify-zlib"),
			querystring: require.resolve("querystring-es3"),
			util: require.resolve("util/"),
		},
	},
};
