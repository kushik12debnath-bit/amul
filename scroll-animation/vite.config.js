import { defineConfig } from 'vite'

export default defineConfig({
  base: '/amul/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        code: './code.html'
      }
    }
  }
})
