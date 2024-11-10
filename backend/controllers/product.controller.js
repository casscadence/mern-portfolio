import mongoose from "mongoose";
import Product from "../models/product.model.js";

// READ
// stores and exports the constant getProducts, after retrieving the request and response of a request and using them in an action
export const getProducts = async (req, res) => {
	// try and catch action
	try {
		// Product.find({}) is like saying mongoose.model("Product", productSchema).find({});
		// find() queries documents from a collection and retrieves them as a query object with an array of all the values that match the query
		// await waits for find() to complete, storing the result as the constant products
		const products = await Product.find({});
		// gives a response status json object with a success boolean true and data object products
		// res.status().json({}) is a chainable response, starting with a status code followed by a json object containing a boolean and object to output upon completion of the try action
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// CREATE
export const createProduct = async (req, res) => {
	const product = req.body; // user will send this data; stores the request body (name, price, image) as a constant

	// if there is no product name or price or image, then return without completing the rest of the code with a status and json object as the response
	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product(product); // creates and verifies an object of the constant product meets the type requirements of the database 

	try {
		// waits to save the newProduct object to the database
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// UPDATE
export const updateProduct = async (req, res) => {
	const { id } = req.params; // request parameters involves the id from the url's query string (ex. /api/products/id)

	const product = req.body; // request body involves the name, price, and image

	// if the id passed in is a valid object id type
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		// findByIdAndUpdate(id, update, options)
		// { new: true } returns the updated record 
		// waits to match and update a product by its id and then returns the updated record and stores it as a constant
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// DELETE
export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
