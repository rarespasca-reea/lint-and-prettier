import path from 'path';
import { fileURLToPath } from 'url';
import eslintConfigPrettier from 'eslint-config-prettier';
import switchBreakAlign from './eslint-local-rules/switch-break-align.js';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
        es2023: true,
        jest: true,
      },
    },
    plugins: {
      'eslint-local-rules': {
        'switch-break-align': switchBreakAlign,
      },
      'react': reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'import': importPlugin,
      'prettier': prettierPlugin,
      'unused-imports': unusedImportsPlugin,
      'jest': jestPlugin,
      'jest-dom': jestDomPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          tabWidth: 2,
        },
      ],
      /** Import Rules */
      'import/order': [
        'error',
        {
          'groups': [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index'],
          'pathGroups': [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
          ],
          'pathGroupsExcludedImportTypes': ['react'],
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always-and-inside-groups',
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-default-export': 'warn',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.test.js', '**/*.spec.js', '**/setupTests.js'],
        },
      ],
      /** React Rules */
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/no-danger': 'warn',
      /** Accessibility Rules */
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/no-noninteractive-tabindex': 'error',
      'jsx-a11y/img-redundant-alt': 'warn',
      /** Security Best Practices */
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-global-assign': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['lodash/*', '.env', 'dotenv'],
        },
      ],
      /** Best Practices */
      'prefer-const': 'error',
      'no-var': 'error',
    },
    settings: {
      'eslint-local-rules': path.resolve(__dirname, './eslint-local-rules'),
      'react': {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  eslintConfigPrettier,
];
