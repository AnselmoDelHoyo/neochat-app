import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: "../server/public",
  },
  server: {
    proxy: {
      "/socket.io": {
        target: "http://locahost:8080",
        ws: true
      }
    }
  }
})
