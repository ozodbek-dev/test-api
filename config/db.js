const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

module.exports =  async function connectToDB() {
	let status = false;
	try {
        mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected successfully...! Host: ${mongoose.connection.host || mongoose.connection.client.s.url || mongoose.connection.client.s.options.srvHost}`.white.bold);
        status = true;
	} catch (err) {
		console.log(err);
	}
}
