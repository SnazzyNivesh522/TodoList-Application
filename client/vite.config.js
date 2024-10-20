import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls in development to your backend
      '/api': 'http://localhost:5000',
    },
  },
  build: {
    outDir: 'build', // Output directory for production build
  },
  define: {
    'process.env': {
      VITE_API_URL: process.env.VITE_API_URL || '/api', // Use environment variable for production API URL
    },
  },
})