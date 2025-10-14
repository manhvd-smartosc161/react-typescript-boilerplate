import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        icon: true,
        titleProp: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@store': path.resolve(__dirname, 'src/stores'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // React libraries
          react: ['react', 'react-dom', 'react-router-dom'],
          // MUI libraries
          mui: ['@mui/material', '@mui/icons-material', '@mui/x-data-grid'],
          // Highcharts
          highcharts: ['highcharts', 'highcharts-react-official'],
          // Form libraries
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          // i18n
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
