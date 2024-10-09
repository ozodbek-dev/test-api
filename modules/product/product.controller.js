// Import the ErrorConstructor utility
const ErrorConstructor = require("../../shares/utils/error_constructor.js");

// Import the catch_async_error middleware
const catch_async_error = require("../../middlewares/catch_async_errors.middleware.js");

// Import the product schema
const productSchema = require("./product.schema.js");

const create = catch_async_error(async (req, res, next) => {
	await productSchema.create(req.body);
	res.status(201).send({
		success: true,
		statusCode: 201,
		msg: "Product created!",
	});
});
const update = catch_async_error(async (req, res, next) => {
	if (!req.params.id) {
		throw new ErrorConstructor("Product id is not found!", 404);
	}
	const isExistProduct = await productSchema.findById(req.params.id);
	if (!isExistProduct) throw new ErrorConstructor("Product not found with given id", 404);
	const newProduct = await productSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });

	res.status(200).send({
		success: true,
		statusCode: 200,
		msg: "updated",
	});
});
const getAllProducts = catch_async_error(async (req, res, next) => {
	const allProducts = await productSchema.find();
	res.status(200).send({
		succses: true,
		msg: "Operation successfully completed!",
		data: {
			products: allProducts,
			totalItems: allProducts.length,
		},
	});
});
const deleteByIds = catch_async_error(async (req, res, next) => {
	await productSchema.deleteMany({ _id: { $in: req.body.productIds } });
	res.status(200).send({
		success: true,
		statusCode: 200,
		msg: "All items have been deleted successfully!",
	});
});

module.exports = { deleteByIds, getAllProducts, update, create };
