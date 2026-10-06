import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

const apiProxyTarget = process.env.API_PROXY_TARGET ?? 'https://localhost:7205'
const isLoopbackApi = ['localhost', '127.0.0.1', '[::1]'].includes(
  new URL(apiProxyTarget).hostname,
)

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/weatherforecast': {
        target: apiProxyTarget,
        changeOrigin: true,
        secure: !isLoopbackApi,
      },
    },
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
