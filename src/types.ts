import type { Linter } from 'eslint'
import type { TypeAwareOptions } from './configs'

export type Awaitable<T> = T | Promise<T>


export type Config = Linter.Config<Linter.RulesRecord>



export interface Options {
    packageJson?: boolean
    tsconfig?: boolean
    jsonc?: boolean
    ignores?: UserIgnores
    stylistic?: boolean
    typeAware?: TypeAwareOptions
}


export type UserIgnores = Awaitable<string[]> | (() => Awaitable<string[]>);
