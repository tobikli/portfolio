import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const gitHash = env.VITE_GIT_HASH || env.SOURCE_COMMIT || env.GIT_HASH || 'latest'
  const gitBranch = env.VITE_GIT_BRANCH || env.SOURCE_BRANCH || env.GIT_BRANCH || 'local'

  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    define: {
      'import.meta.env.VITE_GIT_HASH': JSON.stringify(gitHash),
      'import.meta.env.VITE_GIT_BRANCH': JSON.stringify(gitBranch),
    },
  }
})
