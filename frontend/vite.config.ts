import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: '0.0.0.0',
		proxy: {
			'/api': {
				target: 'http://3.92.239.238:32600',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [react()],
});
