import type { Linter } from 'eslint'

export type Awaitable<T> = T | Promise<T>


export type Config = Linter.Config<Linter.RulesRecord>


export interface Options {
    packageJson?: boolean
    tsconfig?: boolean
    jsonc?: boolean
    ignores?: UserIgnores
}


export type UserIgnores = Awaitable<string[]> | (() => Awaitable<string[]>);