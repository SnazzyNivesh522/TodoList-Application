import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Output directory for production build
  },
  define: {
    'process.env': {
      VITE_API_URL: process.env.VITE_API_URL || '/api', // Use environment variable for production API URL
    },
  },
})