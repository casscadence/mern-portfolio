import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		// executes this code asynchronously, waiting to connect to the database using the environment variables to pass database connection authentication
		const conn = await mongoose.connect(process.env.MONGO_URI);
		// outputs the database connection host upon completion
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1); // process code 1 code means exit with failure, 0 means success
	}
};
