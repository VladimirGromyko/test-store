import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/test-store",
  plugins: [vue(), svgLoader()],
  server: {
    port: 8081
  },
})
