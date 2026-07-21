import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The production site is served from the root domain, so absolute asset URLs
// keep direct clean-route visits such as /weddings and /portfolio working.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://127.0.0.1:4000',
    },
  },
  build: {
    // keep Vite's bundles out of /assets, which holds the photo library
    assetsDir: 'static',
  },
})
