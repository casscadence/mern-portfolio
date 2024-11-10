import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
// stores the environment variable for port or the number 5000 as the PORT constant
const PORT = process.env.PORT || 5000;

// takes the current path and creates an absolute url from it
const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

// if the environment variable is production,
if (process.env.NODE_ENV === "production") {
	// then use the static directory for routing requests
	// path.join() joins the absolute url of the current path to /frontend/dist
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	// receive a GET request from any url, retrieve the request and response, then respond with the file retrieved from the absolute url
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// listens for the PORT constant, either port number 5000 or the environment variable port
app.listen(PORT, () => {
	// connects to the database
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
