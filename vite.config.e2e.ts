import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    alias: {
      '@src': './src',
      '@test': './test',
    },
    root: './',
    setupFiles: ['./test/setup-e2e.ts']
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test',
    },
  },
  plugins: [
		tsconfigPaths(),
   	swc.vite({
      	module: { type: 'es6' },
   	}),
  ]
});
