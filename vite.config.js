import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import path from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [reactPlugin()],
  server: {
    host: 'localhost',
    port: 3000,
    cors: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
