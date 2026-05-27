import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'coverage']),

  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      // ── Formatting ──────────────────────────────────────────────────────

      // Max line length: 100 chars. Ignore import paths and template literals.
      'max-len': [
        'error',
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: false,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreComments: false,
          ignoreTrailingComments: true,
          ignorePattern: '^\\s*//\\s',
        },
      ],

      // Semicolons required at end of every statement
      semi: ['error', 'always'],

      // Single quotes for strings; allow template literals
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

      // Trailing commas everywhere in multi-line: function params, arrays, objects
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],

      // Consistent spacing inside object braces: { foo } not {foo}
      'object-curly-spacing': ['error', 'always'],

      // Space before function parens: named functions have no space, anonymous have space
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],

      // Consistent arrow function bodies — omit braces when only a return
      'arrow-body-style': ['error', 'as-needed'],

      // No trailing whitespace on lines
      'no-trailing-spaces': 'error',

      // Files must end with a newline
      'eol-last': ['error', 'always'],

      // No multiple empty lines — max 1 blank line inside code, max 2 at top-level
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],

      // Newline at end of object/array when multi-line
      'comma-spacing': ['error', { before: false, after: true }],

      // Consistent spacing around operators
      'space-infix-ops': 'error',

      // Spaces after keywords like if, for, while
      'keyword-spacing': ['error', { before: true, after: true }],

      // Space before and after blocks
      'space-before-blocks': 'error',

      // No space between function name and call parens
      'func-call-spacing': ['error', 'never'],

      // Key spacing in objects
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],

      // ── Code Quality ────────────────────────────────────────────────────

      // No console — remove debug logs before committing
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Strict equality always
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // prefer const over let when variable is never reassigned
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],

      // Object shorthand: { foo: foo } → { foo }
      'object-shorthand': ['error', 'always'],

      // Arrow function callbacks: prefer arrow functions
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],

      // No var — use const and let only
      'no-var': 'error',

      // No unused expressions (assignments with no effect)
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],

      // Curly braces for all control-flow blocks
      curly: ['error', 'all'],

      // No duplicate case labels in switch
      'no-duplicate-case': 'error',

      // No duplicate imports — consolidate them
      'no-duplicate-imports': 'error',

      // Require return statements to be consistent within a function
      'consistent-return': 'off', // TypeScript handles this better

      // No dangling underscores (except for intentionally unused vars prefixed with _)
      'no-underscore-dangle': ['error', { allow: [] }],

      // ── TypeScript-specific ──────────────────────────────────────────────

      // No explicit any — use proper types
      '@typescript-eslint/no-explicit-any': 'error',

      // Unused variables are errors — prefix with _ if intentionally unused
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Consistent type imports: import type { Foo } not import { type Foo }
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],

      // Explicit return types on exported functions
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // No non-null assertions (!) — handle null explicitly
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Prefer optional chaining over && null checks
      '@typescript-eslint/prefer-optional-chain': 'error',

      // Prefer nullish coalescing ?? over ||
      '@typescript-eslint/prefer-nullish-coalescing': 'error',

      // No unnecessary type assertions
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // Always await promises — don't fire and forget
      '@typescript-eslint/no-floating-promises': 'error',

      // Require type annotation on catch binding when not using it
      '@typescript-eslint/no-unused-expressions': 'error',

      // ── React ────────────────────────────────────────────────────────────

      // Exhaustive deps in useEffect, useCallback, useMemo
      'react-hooks/exhaustive-deps': 'warn',

      // Rules of hooks
      'react-hooks/rules-of-hooks': 'error',
    },
  },

  // ── Test files — relax some rules ─────────────────────────────────────────
  {
    files: ['**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      // Console is fine in tests
      'no-console': 'off',
      // Non-null assertions are common in test assertions
      '@typescript-eslint/no-non-null-assertion': 'off',
      // Explicit return types not required for test functions
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
]);
