const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js");
const userSchema = require("../modules/user/user.schema.js");

chai.use(chaiHttp);
const { expect } = chai;

const mockToken = process.env.MOCK_TOKEN;
const mockCookies = `token=${mockToken}`;

describe(" ######### Testing Auth api #########".blue, function () {
	it("fails, as expected", function (done) {
		chai
			.request(app)
			.get("/")
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.have.property("url").equal("/");
				expect(res.body).to.have.property("message").equal("Cannot find / on this server");

				done();
			});
	});

	// it("All users have been deleted as expected, except admin ", async function (done) {
	// 	const result = await userSchema.deleteMany({ username: "user-for-testing" });
	// 	expect(result).to.have.status(200);
	// 	done();
	// });

	it("All  username: user-for-testing users have been deleted as expected, except admin ",  function (done) {
		chai
			.request(app)
			.delete("/api/v1/user/delete/user/user-for-testing")
			.set("Authorization", `Bearer ${mockToken}`)
			.set("Cookie", mockCookies)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property("success").equal(true);
				expect(res.body).to.have.property("msg").equal("Muvafaqqiyatli o'chirildi!");
				done()
			});
	});

	it("should return an error if request body is missing", done => {
		chai
			.request(app)
			.post("/api/v1/user/register") // The endpoint for registering a user
			.send({}) // Sending an empty body
			.end((err, res) => {
				expect(res).to.have.status(404); // Expecting an internal server error
				done();
			});
	});

	it("User have been registered, as extected", function (done) {
		const mockdata = {
			username: "user-for-testing",
			password: "userFor@232testing",
			email: "user_for_testing@gmail.com",
		};

		const expectedResponse = JSON.stringify({ success: true, msg: "User have been created!" });
		chai
			.request(app)
			.post("/api/v1/auth/register")
			.send(mockdata)
			.end((err, res) => {
				const actualResponse = JSON.stringify(res.body);
				expect(actualResponse).to.eql(expectedResponse);
				done();
			});
	});

	it("User have been logged in,  as extected", function (done) {
		const mockdata = {
			password: "userFor@232testing",
			email: "user_for_testing@gmail.com",
		};
		chai
			.request(app)
			.post("/api/v1/auth/login")
			.send(mockdata)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property("success").to.equal(true).to.be.a("boolean");
				expect(res.body).to.have.property("token").to.be.a("string");
				done();
			});
	});

	it("User have been Logged out,  as extected", function (done) {
		chai
			.request(app)
			.get("/api/v1/auth/logout")
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property("msg").to.equal("Successful logged out!");
				expect(res.body).to.have.property("success").to.equal(true);
				done();
			});
	});
});
