import { MARKDOWN_GLOB, MARKDOWN_IN_MARKDOWN_GLOB, COMPLETE_JS_TS_GLOB } from '../globs'
import type { Config } from '../types'
import { DEFAULT_STYLISTIC_CONFIG, interopDefault } from '../utils'

export interface StylisticConfig {
  /**
   * Enable experimental rules
   * @default false
   */
  experimental?: boolean
  /**
   * Indentation level
   * @default 2
   */
  indent?: number | 'tab'
  /**
   * Enable JSX support
   * @default true
   */
  jsx?: boolean
  /**
   * Quote style
   * @default 'single'
   */
  quotes?: 'single' | 'double'
  /**
   * Use semicolons
   * @default false
   */
  semi?: boolean
}

export async function stylisticPreset(
  options: StylisticConfig = DEFAULT_STYLISTIC_CONFIG,
): Promise<Config[]> {
  if (!options) {
    return []
  }

  const {
    experimental = DEFAULT_STYLISTIC_CONFIG.experimental,
    indent = DEFAULT_STYLISTIC_CONFIG.indent,
    jsx = DEFAULT_STYLISTIC_CONFIG.jsx,
    quotes = DEFAULT_STYLISTIC_CONFIG.quotes,
    semi = DEFAULT_STYLISTIC_CONFIG.semi,
  } = options

  const [pluginStylistic, pluginAntfu] = await Promise.all([
    interopDefault(import('@stylistic/eslint-plugin')),
    interopDefault(import('eslint-plugin-antfu')),
  ])

  const config = pluginStylistic.configs.customize({
    experimental,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [
    {
      name: 'schplitt/eslint-config:stylistic',
      files: [COMPLETE_JS_TS_GLOB],
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic,
      },
      ignores: [MARKDOWN_GLOB, MARKDOWN_IN_MARKDOWN_GLOB],
      rules: {
        ...config.rules,

        // Only add consistent-list-newline when not using experimental rules
        ...experimental
          ? {}
          : {
              'antfu/consistent-list-newline': 'error',
            },

        'antfu/consistent-chaining': 'error',
        'antfu/curly': 'error',
        'antfu/if-newline': 'error',
        'antfu/top-level-function': 'error',

        'style/arrow-parens': ['error', 'always'],
        'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
        'style/generator-star-spacing': ['error', { before: true, after: true }],
        'style/yield-star-spacing': ['error', { before: false, after: true }],
      },
    },
  ]
}
