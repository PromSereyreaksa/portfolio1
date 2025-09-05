import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})
