import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  test: {
    globals: true,
    css: false,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    coverage: {
      provider: 'istanbul',
      functions: 90,
      lines: 90,
      statements: 90,
      branches: 90,
      reporter: ['text', 'json', 'html'],
      include: ['src/{components,hooks,utils}/**'],
      reportsDirectory: './coverage/',
    },
  },
})
