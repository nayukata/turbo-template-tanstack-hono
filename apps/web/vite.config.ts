import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		port: 3000,
		proxy: {
			"/api/v1": {
				target: "http://localhost:4000",
				changeOrigin: true,
			},
		},
	},
	plugins: [tanstackStart(), react(), tsConfigPaths(), tailwindcss()],
});
