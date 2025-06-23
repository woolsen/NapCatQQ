import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const backendDebugUrl = env.VITE_DEBUG_BACKEND_URL
  console.log('backendDebugUrl', backendDebugUrl)
  return {
    plugins: [
      react(),
      tsconfigPaths(),
    ],
    base: '/webui/',
    server: {
      proxy: {
        '/api/ws/terminal': {
          target: backendDebugUrl,
          ws: true,
          changeOrigin: true
        },
        '/api': backendDebugUrl,
        '/files': backendDebugUrl
      }
    },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-dom': ['react-dom'],
            'react-router-dom': ['react-router-dom'],
            'react-hook-form': ['react-hook-form'],
            'react-icons': ['react-icons'],
            'react-hot-toast': ['react-hot-toast'],
            qface: ['qface']
          }
        }
      }
    }
  }
})
