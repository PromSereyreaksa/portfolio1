import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Base URL for deployment (adjust based on your hosting)
  base: '/',
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
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI components (critical for LCP)
          ui: ['lucide-react'],
          // Analytics (defer loading)
          analytics: ['@vercel/analytics'],
          // Supabase and API libraries
          supabase: ['@supabase/supabase-js', 'dompurify', 'date-fns'],
          // Blog components (lazy load)
          blog: [
            './src/components/blog/BlogPage.jsx',
            './src/components/blog/BlogPost.jsx',
            './src/components/blog/BlogCard.jsx'
          ],
          // Admin components (lazy load)
          admin: [
            './src/components/admin/AdminLogin.jsx',
            './src/components/admin/AdminLayout.jsx',
            './src/components/admin/AdminPosts.jsx',
            './src/components/admin/AdminPostEditor.jsx',
            './src/components/admin/AdminStats.jsx',
            'react-quill-new'
          ],
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
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
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
    https: false,
    // Proxy API requests to Vercel functions in development
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  // Additional optimizations
  define: {
    // Eliminate console logs in production
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
  }
})
