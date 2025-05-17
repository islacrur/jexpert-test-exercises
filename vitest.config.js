import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['ejercicios/**/*.test.js'],
    globals: true
  }
}) 