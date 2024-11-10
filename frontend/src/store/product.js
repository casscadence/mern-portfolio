import { create } from "zustand";

// set is what is passed in to useProductStore(): fetchProducts, products
export const useProductStore = create((set) => ({
	products: [],
	// setProducts is a property with a value of the products array, which contains values: fetchProducts and products
	setProducts: (products) => set({ products }),
	// CREATE
	// createProduct is a property with a value of a newProduct object, resulting from a function
	createProduct: async (newProduct) => {
		// if no name or image or price is found, then return a boolean and string without continuing
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		// sends POST fetch request from client to server
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	// GET
	fetchProducts: async () => {
		// sends GET fetch request from client to server
		// stores the result as a constant
		const res = await fetch("/api/products");
		// formats the result to a json object and stores it as a constant
		const data = await res.json();
		// stores json object to the products array
		set({ products: data.data });
	},
	// DELETE
	// passes the pid as a parameter
	deleteProduct: async (pid) => {
		//sends DELETE fetch request from client to server
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	// UPDATE
	// passes the pid and updatedProduct object as parameters
	updateProduct: async (pid, updatedProduct) => {
		// sends PUT fetch request from client to server
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			// formats the updatedProduct object as a string
			body: JSON.stringify(updatedProduct),
		});
		// formats the response as a json object and stores it as a constant
		const data = await res.json();
		// if data did not succeed, return with a boolean and string without continuing
		if (!data.success) return { success: false, message: data.message };

		// maps each item from the products array to update the new product and stores each item to the products array
		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));
