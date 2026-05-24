import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const backendProxyTarget = process.env.VITE_PROXY_TARGET || 'http://127.0.0.1:5000'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: backendProxyTarget,
        changeOrigin: true,
      },
    },
  },
})
