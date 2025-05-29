import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-qr-code'], // Fuerza la optimización de react-qr-code
  },
  server: {
    historyApiFallback: true, // Redirige todas las rutas al index.html
  },
});
