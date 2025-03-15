import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'process'
import dotenv from 'dotenv'
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT ?? '') || 5432, // Default to 3000 if PORT is not set
    host: '0.0.0.0' // Ensure it's accessible from external networks
  }
})
