import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../'),
			'@server': path.resolve(__dirname, '../server/src'),
		},
	},
	plugins: [react()],
});
