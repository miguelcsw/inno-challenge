import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@components": "/src/components/index.ts",
			"@types": "/src/types/index.ts"
		},
	}
})
