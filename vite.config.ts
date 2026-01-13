import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/camille-30aar/',   // 👈 MEGET VIGTIG
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
