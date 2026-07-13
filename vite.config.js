import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps asset URLs relative so the same build works on
// GitHub Pages (sub-path) and cPanel (domain root) without changes.
export default defineConfig({
  base: './',
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
