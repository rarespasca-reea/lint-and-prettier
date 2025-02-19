import path from 'path';
import switchBreakAlign from './eslint-local-rules/switch-break-align';
import { Legacy } from '@eslint/eslintrc';

export default {
  root: true,
  env: {
    browser: true,
    node: true,
    es2023: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'jsx-a11y', 'import', 'prettier', 'unused-imports', 'jest-dom', 'react-hooks'],
  rules: {
    'eslint-local-rules/switch-break-align': 'error',
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
        paths: ['src', 'eslint-local-rules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

// Manually register local rules in ESLint
Legacy.ConfigArrayFactory.prototype.loadRule = function (name) {
  if (name === 'eslint-local-rules/switch-break-align') {
    return switchBreakAlign;
  }
};
