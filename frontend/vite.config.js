// vite lets you use Javascript modules during development and then bundles them all up into one big file,
// taking care of every code that depends on each other, condensing the work for you

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
});
