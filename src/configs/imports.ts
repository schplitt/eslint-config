import type { Config } from '../types'
import pluginImportLite from 'eslint-plugin-import-lite'
import pluginAntfu from 'eslint-plugin-antfu'

export interface ImportsOptions {
  stylistic?: boolean
}

export async function importsPreset(options: ImportsOptions = {}): Promise<Config[]> {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'schplitt/eslint-config:imports',
      plugins: {
        antfu: pluginAntfu,
        import: pluginImportLite,
      },
      rules: {
        'antfu/import-dedupe': 'error',
        'antfu/no-import-dist': 'error',
        'antfu/no-import-node-modules-by-path': 'error',

        'import/consistent-type-specifier-style': ['error', 'top-level'],
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},

      },
    },
  ]
}
