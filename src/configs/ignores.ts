import { IGNORE_GLOBS } from '../globs'
import type { Config, UserIgnores } from '../types'

export async function ignoresPreset(userIgnores: UserIgnores): Promise<Config[]> {
  const allIgnores: string[] = [
    ...IGNORE_GLOBS,
  ]

  if (typeof userIgnores === 'function') {
    allIgnores.push(...await userIgnores())
  } else {
    allIgnores.push(...await userIgnores)
  }

  return [
    {
      name: 'schplitt/eslint-config:ignores',
      ignores: allIgnores,
    },
  ]
}
