import { defineConfig } from "vite";
import { resolve } from "node:path";

const root = resolve(__dirname, "src");
const publicDir = resolve(__dirname, "public");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
	root,
	publicDir,
	base:
		process.env.NODE_ENV === "production"
			? "https://boysers.github.io/oc-Front-End-Fisheye"
			: "/",
	build: {
		rollupOptions: {
			input: {
				main: resolve(root, "index.html"),
				photographer: resolve(root, "photographer.html"),
			},
		},
		outDir,
	},
});
