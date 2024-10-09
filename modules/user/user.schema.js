const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { reducedModel } = require("../../shares/utils/modelReducer.js");

const userSchema = reducedModel("User", (Schema, _) => {
	const schema = new Schema(
		{
			username: {
				type: String,
				required: true,
				unique: true,
			},
			password: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
				unique: true,
			},
			role: {
				type: String,
				default: "user",
			},
		},
		{ timestamps: true }
	);

	schema.pre("save", async function (next) {
		if (!this.isModified("password")) {
			return next();
		}
		this.password = await bcrypt.hash(this.password, 10);
	});

	schema.methods.getJwtToken = function () {
		return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES,
		});
	};
	schema.methods.comparePassword = function (password) {
		return bcrypt.compare(password, this.password);
	};
	return schema;
});

module.exports =  userSchema;
