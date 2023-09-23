import { defineConfig} from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
      include: ['**/*.e2e-spec.ts'],
      globals: true,
      root: './',
      setupFiles: ['./test/setup-e2e.ts']
	}
})