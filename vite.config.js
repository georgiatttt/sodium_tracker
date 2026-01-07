import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    include: '**/*.{js,jsx,ts,tsx,mjs}'
  })],
  server: {
    proxy: {
      '/off': {
        target: 'https://world.openfoodfacts.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/off/, ''),
      },
    },
  },
})
