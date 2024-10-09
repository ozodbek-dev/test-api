const { reducedModel } = require("../../shares/utils/modelReducer.js");

const productSchema = reducedModel("Product", (Schema, ObjectId) => {
	return new Schema(
		{
			name: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			specifications: {
				// Changed from 'spesifications' to 'specifications'
				type: [
					{
						name: {
							type: String,
							required: true,
						},
						value: {
							type: String,
							required: true,
						},
					},
				],
				required: true,
			},
			description: {
				type: String,
				default: "",
			},
			inStock: {
				type: Number,
				default: 1,
			},
			tags: {
				type: String,
				default: "product",
			},
		},
		{ timestamps: true }
	);
});

module.exports =  productSchema;
