import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-qr-code'], // Fuerza la optimización de react-qr-code
  },
  server: {
    host: true,
    port: 5173, // Cambia el puerto
    historyApiFallback: true, // Redirige todas las rutas al index.html
  },
});
