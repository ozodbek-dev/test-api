require("colors");

const PORT = process.env.PORT || 4000;

function connectToServer(app) {
	return app.listen(PORT, err => {
		if (!err) {
			console.log(`Server connected successfully...! Port: ${PORT}`.yellow.bold);
			return;
		}
		console.log(`${err.message}`.red);
	});
}

module.exports = connectToServer;
