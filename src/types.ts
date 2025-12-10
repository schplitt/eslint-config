import type { Linter } from 'eslint'
import type { AngularOptions, PnpmOptions, TypeAwareOptions } from './configs'
import type { StylisticConfig } from './configs/stylistic'

export type Awaitable<T> = T | Promise<T>

export type Config = Linter.Config<Linter.RulesRecord>

export interface Options {
  packageJson?: boolean
  tsconfig?: boolean
  jsonc?: boolean
  markdown?: boolean
  angular?: boolean | AngularOptions
  ignores?: UserIgnores
  stylistic?: boolean | StylisticConfig
  typeAware?: boolean | TypeAwareOptions
  pnpm?: boolean | PnpmOptions
}

export type UserIgnores = Awaitable<string[]> | (() => Awaitable<string[]>)

export interface CommonOptions {
  isInEditor?: boolean
}
