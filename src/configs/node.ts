import type { Config } from '../types'
import pluginNode from 'eslint-plugin-n'

/**
 * Node.js preset with recommended rules for Node.js environments.
 * Includes rules for proper callback error handling, deprecated APIs, and more.
 */
export async function nodePreset(): Promise<Config[]> {
  return [
    {
      name: 'schplitt/eslint-config:node',
      plugins: {
        node: pluginNode,
      },
      rules: {
        'node/handle-callback-err': ['error', '^(err|error)$'],
        'node/no-deprecated-api': 'error',
        'node/no-exports-assign': 'error',
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/prefer-global/buffer': ['error', 'never'],
        'node/prefer-global/process': ['error', 'never'],
        'node/process-exit-as-throw': 'error',
      },
    },
  ]
}
