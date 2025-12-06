import type { Config } from '../types'
import { interopDefault } from '../utils'

/**
 * JSONC rules for all JSON files.
 * Includes jsonc plugin and parser setup.
 * Only applied when `jsonc: true` is set.
 */
export async function jsoncPreset(): Promise<Config[]> {
  const [
    eslintPluginJsonc,
    jsoncEslintParser,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-jsonc')),
    interopDefault(import('jsonc-eslint-parser')),
  ])

  return [
    {
      name: 'schplitt/eslint-config:jsonc',
      files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
      plugins: {
        jsonc: eslintPluginJsonc as any,
      },
      languageOptions: {
        parser: jsoncEslintParser,
      },
      rules: {
        // Add JSONC rules here when needed
      },
    },
  ]
}
