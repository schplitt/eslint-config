import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { angularPreset, javascriptPreset, jsoncPreset, nodePreset, packageJsonPreset, stylisticPreset, tsconfigPreset, typescriptPreset, ignoresPreset, jsdocPreset, markdownPreset, pnpmPreset, commentsPreset, importsPreset, vuePreset, yamlPreset } from './configs'
import type { Awaitable, Config, Options } from './types'
import { isInEditorEnv } from './utils'
import { findUpSync } from 'find-up-simple'

/**
 * Create an ESLint flat config with sensible defaults.
 * @param options - Configuration options
 * @returns FlatConfigComposer that can be used directly as ESLint config
 */
export function schplitt(options: Options = {}): FlatConfigComposer<Config> {
  // Merge defaults with user options
  const {
    packageJson = true,
    jsonc = false,
    tsconfig = true,
    markdown = true,
    yaml = false,
    angular = false,
    vue = false,
    ignores = [],
    stylistic = true,
    typeAware = false,
    pnpm = findUpSync('pnpm-lock.yaml') !== undefined,
  } = options

  const isInEditor = isInEditorEnv()

  const configs: Awaitable<Config[]>[] = []

  // defaults
  configs.push(
    ignoresPreset(ignores),
    javascriptPreset({ isInEditor }),
    jsdocPreset({ stylistic: !!stylistic }),
    nodePreset(),
    typescriptPreset({
      isInEditor,
      typeAware,
    }),
    commentsPreset(),
    importsPreset({ stylistic: !!stylistic }),
  )

  if (stylistic) {
    configs.push(
      stylisticPreset(typeof stylistic === 'boolean' ? {} : stylistic),
    )
  }

  if (angular) {
    configs.push(
      angularPreset(typeof angular === 'boolean' ? { isInEditor } : { ...angular, isInEditor }),
    )
  }

  if (jsonc) {
    configs.push(jsoncPreset())
  }

  if (packageJson) {
    configs.push(packageJsonPreset())
  }

  if (tsconfig) {
    configs.push(tsconfigPreset())
  }

  if (markdown) {
    configs.push(markdownPreset())
  }

  if (pnpm) {
    configs.push(
      pnpmPreset(typeof pnpm === 'boolean' ? { isInEditor } : { ...pnpm, isInEditor }),
    )
  }

  if (vue) {
    configs.push(
      vuePreset(typeof vue === 'boolean' ? {} : vue),
    )
  }

  if (yaml) {
    configs.push(
      yamlPreset(typeof yaml === 'boolean' ? {} : yaml),
    )
  }

  const composer = new FlatConfigComposer<Config>().append(...configs)

  return composer
}

export default schplitt
