import { defineConfig } from 'vite'

// base: './' → relative asset paths so the BGU hub can clone & serve the built
// files from any sub-path inside its sandbox. No backend, fully static output.
export default defineConfig({
  base: './',
  build: {
    target: 'es2018',
    outDir: 'dist',
    assetsInlineLimit: 4096
  }
})
