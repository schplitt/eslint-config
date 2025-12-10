import type { Linter } from 'eslint'
import type { AngularOptions, PnpmOptions, StylisticConfig, TypeAwareOptions, VueOptions } from './configs'

export type Awaitable<T> = T | Promise<T>

export type Config = Linter.Config<Linter.RulesRecord>

export interface Options {
  packageJson?: boolean
  tsconfig?: boolean
  jsonc?: boolean
  markdown?: boolean
  angular?: boolean | AngularOptions
  vue?: boolean | VueOptions
  ignores?: UserIgnores
  stylistic?: boolean | StylisticConfig
  typeAware?: boolean | TypeAwareOptions
  pnpm?: boolean | PnpmOptions
}

export type UserIgnores = Awaitable<string[]> | (() => Awaitable<string[]>)

export interface CommonOptions {
  isInEditor?: boolean
}
