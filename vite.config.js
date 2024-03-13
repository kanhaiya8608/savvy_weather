import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

export default defineConfig(({ command, mode }) => {
  dotenv.config();

  const env = loadEnv(mode, process.cwd(), '')
  return {
  plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})