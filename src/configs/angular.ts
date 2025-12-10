import type { CommonOptions, Config } from '../types'

import { createAngularGlobs } from '../globs'
import { interopDefault } from '../utils'

export interface AngularOptions {
  /**
   * Root path for Angular project files.
   * This determines which TypeScript and HTML files will have Angular rules applied.
   *
   * @default 'app'
   */
  projectPath?: string

  /**
   * Additional file patterns to exclude from Angular linting.
   * These will be added to the default ignores.
   *
   * @default []
   */
  ignores?: string[]
}

/**
 * Angular preset with ESLint rules for TypeScript and HTML templates.
 *
 * This preset configures:
 * - Angular-specific TypeScript rules for components, directives, pipes, etc.
 * - Template rules for HTML files (external templates)
 * - Inline template linting via processor
 *
 * By default, Angular rules only apply to files under the app/ directory.
 * Use projectPath to customize this location.
 *
 * @param options - Configuration options
 */
export async function angularPreset(options: AngularOptions & CommonOptions = {}): Promise<Config[]> {
  const {
    projectPath = 'app',
    ignores = [],
    isInEditor = false,
  } = options

  const globs = createAngularGlobs(projectPath)

  const angularESLint = await interopDefault(import('angular-eslint'))

  const pluginAngular = angularESLint.tsPlugin
  const pluginAngularTemplate = angularESLint.templatePlugin
  const parserAngularTemplate = angularESLint.templateParser
  const processInlineTemplates = angularESLint.processInlineTemplates

  return [
    // TypeScript files config (Components, Directives, Services, etc.)
    {
      name: 'schplitt/eslint-config:angular/typescript',
      files: [globs.ts, globs.tsx],
      ignores,
      plugins: {
        '@angular-eslint': pluginAngular as any,
      },
      processor: processInlineTemplates as any,
      rules: {
        // ══════════════════════════════════════════════════════════════
        // Angular TypeScript Rules
        // Configure your own rules here
        // ══════════════════════════════════════════════════════════════
        '@angular-eslint/contextual-lifecycle': 'error',
        '@angular-eslint/no-empty-lifecycle-method': 'error',
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-inputs-metadata-property': 'error',
        '@angular-eslint/no-output-native': 'error',
        '@angular-eslint/no-output-on-prefix': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/no-outputs-metadata-property': 'error',
        '@angular-eslint/prefer-inject': 'error',
        '@angular-eslint/prefer-standalone': 'error',
        '@angular-eslint/prefer-signal-model': 'error',
        '@angular-eslint/prefer-signals': 'error',
        '@angular-eslint/sort-keys-in-type-decorator': 'error',
        '@angular-eslint/sort-lifecycle-methods': 'error',
        '@angular-eslint/use-component-selector': 'error',
        '@angular-eslint/use-injectable-provided-in': 'warn',
        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error',
      },
    },

    // HTML template files config (external templates and inline templates)
    {
      name: 'schplitt/eslint-config:angular/template',
      files: [globs.html],
      ignores,
      languageOptions: {
        parser: parserAngularTemplate as any,
      },
      plugins: {
        '@angular-eslint/template': pluginAngularTemplate as any,
      },
      rules: {
        // ══════════════════════════════════════════════════════════════
        // Angular Template Rules
        // Configure your own rules here
        // ══════════════════════════════════════════════════════════════
        '@angular-eslint/template/banana-in-box': 'error',
        '@angular-eslint/template/attributes-order': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/eqeqeq': 'error',
        '@angular-eslint/template/no-any': 'error',
        '@angular-eslint/template/no-call-expression': 'error',
        '@angular-eslint/template/no-duplicate-attributes': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/no-empty-control-flow': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/no-interpolation-in-attributes': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/no-negated-async': 'error',
        '@angular-eslint/template/prefer-at-else': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/prefer-at-empty': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/prefer-built-in-pipes': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/prefer-control-flow': 'error',
        '@angular-eslint/template/prefer-contextual-for-variables': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/prefer-ngsrc': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/prefer-self-closing-tags': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/prefer-static-string-properties': isInEditor ? 'warn' : 'error',
        '@angular-eslint/template/prefer-template-literal': isInEditor ? 'warn' : 'error',
      },
    },
  ]
}
