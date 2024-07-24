import js from '@eslint/js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { globalIgnores } from 'eslint/config'

const eslintConfig = [
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      '@next/next/no-async-client-component': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      semi: 'off',
      'comma-dangle': 'off',
      quotes: 'off',
      'padded-blocks': 'off',
      'no-multiple-empty-lines': 'off',
      camelcase: 'off',
      'jsx-a11y/*': 'off',
    },
  },
]

export default eslintConfig
