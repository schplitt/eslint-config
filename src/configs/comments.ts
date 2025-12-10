import type { Config } from '../types'
// @ts-expect-error - no types available
import pluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments'

/**
 * ESLint comments preset with recommended best practices.
 * Enforces proper usage of eslint-disable/eslint-enable directives.
 */
export async function commentsPreset(): Promise<Config[]> {
  return [
    {
      name: 'schplitt/eslint-config:comments',
      plugins: {
        'eslint-comments': pluginEslintComments,
      },
      rules: {
        // Require a eslint-enable comment for every eslint-disable comment
        '@eslint-community/eslint-comments/disable-enable-pair': 'error',
        // Disallow a eslint-enable comment for multiple eslint-disable comments
        '@eslint-community/eslint-comments/no-aggregating-enable': 'error',
        // Disallow duplicate eslint-disable comments
        '@eslint-community/eslint-comments/no-duplicate-disable': 'error',
        // Disallow eslint-disable comments without rule names
        '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
        // Disallow unused eslint-enable comments
        '@eslint-community/eslint-comments/no-unused-enable': 'error',
      },
    },
  ]
}
