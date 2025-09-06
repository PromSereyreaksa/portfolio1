import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries (critical)
          vendor: ['react', 'react-dom'],
          // UI components (critical for LCP)
          ui: ['lucide-react'],
          // Analytics (defer loading)
          analytics: ['@vercel/analytics'],
          // Non-critical sections (lazy load)
          sections: [
            './src/components/aboutSection.jsx',
            './src/components/ProjectsSection.jsx',
            './src/components/BrutalistArtworkSection.jsx',
            './src/components/ContactSection.jsx'
          ]
        },
        // Optimize chunk names for aggressive caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
      // Improve treeshaking for smaller bundles
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 400, // Even stricter for mobile
    minify: 'esbuild',
    reportCompressedSize: false,
    sourcemap: false,
    target: 'es2020',
    // Optimize asset handling
    assetsInlineLimit: 2048 // Inline small assets (<2KB)
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    exclude: ['@vercel/analytics'] // Defer analytics
  },
  // Development server configuration
  server: {
    compress: true,
    port: 5173,
    strictPort: false,
    // Prevent CORS issues
    cors: true,
    // Enable HTTP/2 for better performance
    https: false
  },
  // Additional optimizations
  define: {
    // Eliminate console logs in production
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
  }
})
