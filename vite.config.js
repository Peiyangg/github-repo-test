import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/github-repo-test/",
  plugins: [svelte()],
  assetsInclude: ['**/*.json'],
  resolve: {
    dedupe: ['d3']
  },
  optimizeDeps: {
    include: ['d3']
  }
});