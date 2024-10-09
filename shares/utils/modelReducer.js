const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const reducedModel = (name, cb) => {
	const schema = cb(Schema, ObjectId);
	return model(name, schema);
};

module.exports = { reducedModel };
