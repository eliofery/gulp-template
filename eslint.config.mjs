import globals from 'globals'
import jsPlugin from '@eslint/js'
import tsPlugin from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import tsParser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['node_modules', 'build', 'gulp', 'modernizr.js'],
  },

  jsPlugin.configs.recommended,
  ...tsPlugin.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {},
  },

  eslintConfigPrettier,
]
