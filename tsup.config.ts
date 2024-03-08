import { defineConfig } from "tsup";

export default defineConfig({
	entryPoints: ["src/index.ts"],
	outDir: "dist",
	bundle: true,
	clean: true,
});
