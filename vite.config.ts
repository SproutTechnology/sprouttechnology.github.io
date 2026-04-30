import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { getIndexablePages } from './src/i18n/site-pages';

const htmlInputs = Object.fromEntries([
  ['index', resolve(__dirname, 'index.html')],
  ...getIndexablePages().map((page: ReturnType<typeof getIndexablePages>[number]) => {
    const entryKey = `${page.path.slice(1)}index`.replace(/\/$/, '').replace(/\/+/g, '/');
    const entryPath = resolve(__dirname, page.path.slice(1), 'index.html');

    return [entryKey, entryPath];
  }),
]);

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: htmlInputs,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.test.*', '**/*.spec.*', 'src/test/**', '**/*.d.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
