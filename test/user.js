const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js");
const loadash = require("lodash");
const userSchema = require("../modules/user/user.schema.js");

chai.use(chaiHttp);
const { expect } = chai;

const mockToken = process.env.MOCK_TOKEN;
const mockCookies = `token=${mockToken}`;

before(done => {
	userSchema.deleteMany({});
	done();
});
after(async done => {
	userSchema.deleteMany({});
	done();
});

describe("######### Testing User api ######### ".blue, () => {
	it("Get user detailes api have been worked as extected", function (done) {
		const expectedResponse = {
			user: {
				_id: "67059c8f34bdf1c0ae8af541",
			},
		};

		chai
			.request(app)
			.get("/api/v1/user/get/me")
			.set("Authorization", `Bearer ${mockToken}`)
			.set("Cookie", mockCookies)
			.end((err, res) => {
				const actualResponse = res.body;
				expect(res).to.have.status(200);
				expect(loadash.isEqual(actualResponse.user._id, expectedResponse.user._id)).to.be.true;
				done();
			});
	});

	it("Users list have been received as expected", function (done) {
		chai
			.request(app)
			.get("/api/v1/user/get/all")
			.set("Authorization", `Bearer ${mockToken}`)
			.set("Cookie", mockCookies)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property("statusCode").eql(200);
				expect(res.body).to.have.property("msg").eql("Successesfull!");
				expect(res.body).to.have.property("data").that.is.an("object");
				expect(res.body.data).to.have.property("users").that.is.an("array");
				expect(res.body.data).to.have.property("totalItems").that.is.a("number");
				done();
			});
	});

	it("User have been updated as expected", function (done) {
		const mockData = { username: "test-admin-updated" };
		chai.request(app).put("/api/v1/user/update/me").set("Authorization", `Bearer ${mockToken}`).set("Cookie", mockCookies)
		.send(mockData).end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property("success").eql(true);
			expect(res.body).to.have.property("msg").eql("User Updated!");
			done();
		});
	});

	it("User password have been changed as expected", function (done) {
		const mockData = { newPassword: "testAdmin@232testing?*", oldPassword: "testAdmin@232testing?*" };
		chai
			.request(app)
			.put("/api/v1/user/change/myPassword")
			.set("Authorization", `Bearer ${mockToken}`)
			.set("Cookie", mockCookies).send(mockData).end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property("success").eql(true);
			expect(res.body).to.have.property("msg").eql("Maxfiy so'z o'zgartirildi!");
			done();
		});
	});

	it("User role have been changed as expected", function (done) {
		const mockData = { role: "admin" };
		chai
			.request(app)
			.put("/api/v1/user/67059c8f34bdf1c0ae8af541")
			.set("Authorization", `Bearer ${mockToken}`)
			.set("Cookie", mockCookies).send(mockData).end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property("success").eql(true);
			expect(res.body).to.have.property("msg").eql("Role have been changed!");
			done();
		});
	});

	it("User have been updated by admin as expected", function (done) {
		const mockData = { username: "test-admin-updated-byadmin" };
		chai
			.request(app)
			.put("/api/v1/user/update/67059c8f34bdf1c0ae8af541")
			.set("Authorization", `Bearer ${mockToken}`)
			.set("Cookie", mockCookies).send(mockData).end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property("success").eql(true);
			expect(res.body).to.have.property("msg").eql("User updated!");
			done();
		});
	});
});
