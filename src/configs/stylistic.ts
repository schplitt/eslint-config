import { MARKDOWN_GLOB, MARKDOWN_IN_MARKDOWN_GLOB } from '../globs'
import type { Config } from '../types'
import { interopDefault } from '../utils'

export type StylisticConfig = boolean | {
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
  options: StylisticConfig = {},
): Promise<Config[]> {
  if (!options) {
    return []
  }

  const {
    experimental = false,
    indent = 2,
    jsx = true,
    quotes = 'single',
    semi = false,
  } = options === true ? {} : options

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
