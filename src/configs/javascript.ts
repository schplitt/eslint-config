import type { Config } from '../types'

import globals from 'globals'

import pluginAntfu from 'eslint-plugin-antfu'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import { COMPLETE_JS_TS_GLOB, MARKDOWN_CODE_GLOB, MARKDOWN_GLOB, MARKDOWN_IN_MARKDOWN_GLOB } from '../globs'

export interface JavascriptOptions {
  isInEditor?: boolean
}

/**
 * JavaScript preset with sensible defaults.
 * Includes globals, antfu plugin, and unused-imports plugin.
 * @param options - Configuration options
 */
export async function javascriptPreset(options: JavascriptOptions = {}): Promise<Config[]> {
  const {
    isInEditor = false,
  } = options

  return [
    {
      name: 'schplitt/eslint-config:javascript',
      files: [COMPLETE_JS_TS_GLOB, MARKDOWN_CODE_GLOB],
      ignores: [MARKDOWN_GLOB, MARKDOWN_IN_MARKDOWN_GLOB],
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.es2023,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      plugins: {
        'antfu': pluginAntfu,
        'unused-imports': pluginUnusedImports,
      },
      rules: {
        // ══════════════════════════════════════════════════════════════
        // Accessor & Class Rules
        // ══════════════════════════════════════════════════════════════
        'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],
        'constructor-super': 'error',
        'no-class-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-this-before-super': 'error',
        'no-useless-constructor': 'error',

        // ══════════════════════════════════════════════════════════════
        // Antfu Plugin Rules
        // ══════════════════════════════════════════════════════════════
        'antfu/no-top-level-await': 'error',

        // ══════════════════════════════════════════════════════════════
        // Array & Object Rules
        // ══════════════════════════════════════════════════════════════
        'array-callback-return': 'error',
        'no-array-constructor': 'error',
        'no-sparse-arrays': 'error',
        'object-shorthand': ['error', 'always', { avoidQuotes: true, ignoreConstructors: false }],

        // ══════════════════════════════════════════════════════════════
        // Async & Promise Rules
        // ══════════════════════════════════════════════════════════════
        'no-async-promise-executor': 'error',
        'no-promise-executor-return': 'error',
        'prefer-promise-reject-errors': 'error',

        // ══════════════════════════════════════════════════════════════
        // Best Practices
        // ══════════════════════════════════════════════════════════════
        'block-scoped-var': 'error',
        'default-case-last': 'error',
        'dot-notation': ['error', { allowKeywords: true }],
        'eqeqeq': ['error', 'smart'],
        'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],
        'no-alert': 'error',
        'no-caller': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-implied-eval': 'error',
        'no-iterator': 'error',
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
        'no-lone-blocks': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-return-assign': 'error',
        'no-self-assign': ['error', { props: true }],
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-void': 'error',
        'no-with': 'error',
        'prefer-object-has-own': 'error',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],

        // ══════════════════════════════════════════════════════════════
        // Case & Switch Rules
        // ══════════════════════════════════════════════════════════════
        'no-case-declarations': 'error',
        'no-duplicate-case': 'error',
        'no-fallthrough': 'error',

        // ══════════════════════════════════════════════════════════════
        // Console & Debugging
        // ══════════════════════════════════════════════════════════════
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-debugger': 'error',

        // ══════════════════════════════════════════════════════════════
        // Control Flow Rules
        // ══════════════════════════════════════════════════════════════
        'no-cond-assign': ['error', 'always'],
        'no-constant-binary-expression': 'error',
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unsafe-optional-chaining': 'error',

        // ══════════════════════════════════════════════════════════════
        // Declaration Rules
        // ══════════════════════════════════════════════════════════════
        'no-const-assign': 'error',
        'no-delete-var': 'error',
        'no-redeclare': ['error', { builtinGlobals: false }],
        'no-shadow-restricted-names': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-var': 'error',
        'one-var': ['error', { initialized: 'never' }],
        'prefer-const': [isInEditor ? 'warn' : 'error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
        'vars-on-top': 'error',

        // ══════════════════════════════════════════════════════════════
        // Empty & Whitespace Rules
        // ══════════════════════════════════════════════════════════════
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
        'no-irregular-whitespace': 'error',
        'no-unexpected-multiline': 'error',
        'unicode-bom': ['error', 'never'],

        // ══════════════════════════════════════════════════════════════
        // Expression Rules
        // ══════════════════════════════════════════════════════════════
        'no-extra-boolean-cast': 'error',
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unused-expressions': ['error', { allowShortCircuit: true, allowTaggedTemplates: true, allowTernary: true }],

        // ══════════════════════════════════════════════════════════════
        // Function Rules
        // ══════════════════════════════════════════════════════════════
        'no-dupe-args': 'error',
        'no-func-assign': 'error',
        'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',

        // ══════════════════════════════════════════════════════════════
        // Global & Native Rules
        // ══════════════════════════════════════════════════════════════
        'no-global-assign': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-obj-calls': 'error',
        'no-restricted-globals': [
          'error',
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' },
        ],
        'no-restricted-properties': [
          'error',
          { message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.', property: '__proto__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineGetter__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineSetter__' },
          { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupGetter__' },
          { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupSetter__' },
        ],

        // ══════════════════════════════════════════════════════════════
        // Import Rules
        // ══════════════════════════════════════════════════════════════
        'no-import-assign': 'error',

        // ══════════════════════════════════════════════════════════════
        // Math & Number Rules
        // ══════════════════════════════════════════════════════════════
        'no-compare-neg-zero': 'error',
        'no-loss-of-precision': 'error',
        'prefer-exponentiation-operator': 'error',
        'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],

        // ══════════════════════════════════════════════════════════════
        // Object Rules
        // ══════════════════════════════════════════════════════════════
        'no-dupe-keys': 'error',

        // ══════════════════════════════════════════════════════════════
        // Regex Rules
        // ══════════════════════════════════════════════════════════════
        'no-control-regex': 'error',
        'no-invalid-regexp': 'error',
        'no-misleading-character-class': 'error',
        'no-regex-spaces': 'error',
        'no-useless-backreference': 'error',

        // ══════════════════════════════════════════════════════════════
        // Restricted Syntax
        // ══════════════════════════════════════════════════════════════
        'no-restricted-syntax': [
          'error',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment',
        ],

        // ══════════════════════════════════════════════════════════════
        // String Rules
        // ══════════════════════════════════════════════════════════════
        'no-template-curly-in-string': 'error',
        'prefer-template': 'error',

        // ══════════════════════════════════════════════════════════════
        // Symbol Rules
        // ══════════════════════════════════════════════════════════════
        'symbol-description': 'error',

        // ══════════════════════════════════════════════════════════════
        // Try/Catch Rules
        // ══════════════════════════════════════════════════════════════
        'no-ex-assign': 'error',

        // ══════════════════════════════════════════════════════════════
        // Type Checking Rules
        // ══════════════════════════════════════════════════════════════
        'valid-typeof': ['error', { requireStringLiterals: true }],

        // ══════════════════════════════════════════════════════════════
        // Unused Imports Plugin Rules
        // ══════════════════════════════════════════════════════════════
        'unused-imports/no-unused-imports': isInEditor ? 'warn' : 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],

        // ══════════════════════════════════════════════════════════════
        // Variable Usage Rules
        // ══════════════════════════════════════════════════════════════
        'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
      },
    },
  ]
}
