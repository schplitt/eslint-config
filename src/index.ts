import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { angularPreset, javascriptPreset, jsoncPreset, nodePreset, packageJsonPreset, stylisticPreset, tsconfigPreset, typescriptPreset, ignoresPreset, jsdocPreset, markdownPreset } from './configs'
import type { Awaitable, Config, Options } from './types'
import { isInEditorEnv } from './utils'

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
    angular = false,
    ignores = [],
    stylistic = true,
    typeAware = false,
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
  )

  if (stylistic) {
    configs.push(
      stylisticPreset(typeof stylistic === 'boolean' ? {} : stylistic),
    )
  }

  if (angular) {
    configs.push(
      angularPreset(typeof angular === 'boolean' ? {} : angular),
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

  const composer = new FlatConfigComposer<Config>().append(...configs)

  return composer
}

export default schplitt
