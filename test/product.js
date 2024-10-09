const chai = require("chai");
const chaiHttp = require("chai-http");
const { request } = require("chai-http");
const app = require("../index.js");
const productSchema = require("../modules/product/product.schema.js");
const { create } = require("../modules/product/product.controller.js");

chai.use(chaiHttp);
const { expect } = chai;


const mockToken = process.env.MOCK_TOKEN;
const mockCookies = `token=${mockToken}`;
	
before(done => {
	productSchema.deleteMany({});
	done();
});

after(done => {
	productSchema.deleteMany({});
	done();
});
describe("######## Testing Product api ######## ".blue, () => {
	it("Products list have been received as expected", function (done) {
		chai
			.request(app)
			.get("/api/v1/product/get/all")
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property("succses").eql(true);
				expect(res.body).to.have.property("msg").eql("Operation successfully completed!");
				expect(res.body).to.have.property("data").that.is.an("object");
				expect(res.body.data).to.have.property("products").that.is.an("array");
				expect(res.body.data).to.have.property("totalItems").that.is.a("number");
				done();
			});
	});

	it("Product have been created as extected", function (done) {
		const mockdata = {
			name: "Macbook pro m3 2023",
			price: 1400,
			description: "sample optional description",
			inStock: 123,
			tags: "there are must be tags for seo",
			specifications: [
				{
					name: "RAM",
					value: "DDR4 16GB",
				},
				{
					name: "CPU",
					value: "M3",
				},
			],
		};

		const expectedResponse = JSON.stringify({
			success: true,
			statusCode: 201,
			msg: "Product created!",
		});

		chai
			.request(app)
			.post("/api/v1/product/create/")
			.set("Authorization", `Bearer ${mockToken}`)
			.send(mockdata)
			.set("Cookie", mockCookies)
			.end((err, res) => {
				const actualResponse = JSON.stringify(res.body);
				expect(res).to.have.status(201);
				expect(actualResponse).to.eql(expectedResponse);
				done(console.dir(err));
			});
	});

	it("Product have been updated as extected", function (done) {
		const mockdata = {
			tags: "tag,tag,tag",
		};

		const expectedResponse = JSON.stringify({ success: true, statusCode: 200, msg: "updated" });

		chai
			.request(app)
			.put("/api/v1/product/67059d7434bdf1c0ae8af550")
			.set("Authorization", `Bearer ${mockToken}`)
			.set("Cookie", mockCookies)
			.send(mockdata)
			.end((err, res) => {
				const actualResponse = JSON.stringify(res.body);
				expect(res).to.have.status(200);
				expect(actualResponse).to.eql(expectedResponse);
				done(console.dir(err));
			});
	});

	it("Product have been deleted as extected", function (done) {
		const mockdata = {
			productIds: ["67059cdf34bdf1c0ae8af547"],
		};
		chai
			.request(app)
			.delete("/api/v1/product/delete")
			.set("Authorization", `Bearer ${mockToken}`)
			.set("Cookie", mockCookies)
			.send(mockdata)
			.end((err, res) => {

				expect(res).to.have.status(200);
				done();
			});
	});
});
