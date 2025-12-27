import type { CommonOptions, Config } from '../types'
import { YAML_GLOB } from '../globs'
import { DEFAULT_STYLISTIC_CONFIG, interopDefault } from '../utils'
import type { StylisticConfig } from './stylistic'

export interface YamlOptions {
  files?: string[]
  overrides?: Record<string, any>
  stylistic?: StylisticConfig
}

/**
 * YAML preset with eslint-plugin-yml.
 * Dynamically loads the yaml parser only when needed.
 * @param options - Configuration options
 */
export async function yamlPreset(
  options: YamlOptions & CommonOptions = {},
): Promise<Config[]> {
  const {
    files = [YAML_GLOB],
    overrides = {},
    stylistic = DEFAULT_STYLISTIC_CONFIG,
  } = options

  const {
    indent = DEFAULT_STYLISTIC_CONFIG.indent,
    quotes = DEFAULT_STYLISTIC_CONFIG.quotes,
  } = typeof stylistic === 'object' ? stylistic : DEFAULT_STYLISTIC_CONFIG

  const [
    pluginYaml,
    parserYaml,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-yml')),
    interopDefault(import('yaml-eslint-parser')),
  ] as const)

  return [
    {
      name: 'schplitt/eslint-config:yaml/setup',
      plugins: {
        yaml: pluginYaml as any,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserYaml,
      },
      name: 'schplitt/eslint-config:yaml/rules',
      rules: {
        'style/spaced-comment': 'off',

        'yaml/block-mapping': 'error',
        'yaml/block-sequence': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/plain-scalar': 'error',

        'yaml/vue-custom-block/no-parsing-error': 'error',

        ...stylistic
          ? {
              'yaml/block-mapping-question-indicator-newline': 'error',
              'yaml/block-sequence-hyphen-indicator-newline': 'error',
              'yaml/flow-mapping-curly-newline': 'error',
              'yaml/flow-mapping-curly-spacing': 'error',
              'yaml/flow-sequence-bracket-newline': 'error',
              'yaml/flow-sequence-bracket-spacing': 'error',
              'yaml/indent': ['error', indent === 'tab' ? 2 : indent],
              'yaml/key-spacing': 'error',
              'yaml/no-tab-indent': 'error',
              'yaml/quotes': ['error', { avoidEscape: true, prefer: quotes }],
              'yaml/spaced-comment': 'error',
            }
          : {},

        ...overrides,
      },
    },
  ]
}
