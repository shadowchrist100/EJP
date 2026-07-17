/* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        assetsInclude: ['**/*.mpeg'],
        plugins: [
            react(),
            tailwindcss(),
        ],
        server: {
            port: 5173,
            proxy: {
                '/api': {
                    target: env.VITE_API_URL || 'http://localhost:8000',
                    changeOrigin: true,
                }
            }
        },
        build: {
            // M7: Explicit chunk splitting for large vendor libraries
            rollupOptions: {
                output: {
                    manualChunks: {
                        // Isolate framer-motion (~120KB gzipped) into its own chunk
                        // so it can be cached independently of app code
                        'vendor-framer': ['framer-motion'],
                        // Isolate React core
                        'vendor-react': ['react', 'react-dom'],
                        // Router
                        'vendor-router': ['react-router-dom'],
                    },
                },
            },
            // Raise the chunk size warning threshold slightly (framer-motion is large)
            chunkSizeWarningLimit: 600,
        },
    };
});
