import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { javascriptPreset, jsoncPreset, packageJsonPreset, stylisticPreset, typescriptPreset } from './configs'
import type { Awaitable, Config, Options } from './types'
import { ignoresPreset } from './configs/ignores'
import { jsdocPreset } from './configs/jsdoc'
import { isInEditorEnv } from './utils'

/**
 * Create an ESLint flat config with sensible defaults.
 * @param options - Configuration options
 * @returns FlatConfigComposer that can be used directly as ESLint config
 */
export async function schplitt(options: Options = {}): Promise<FlatConfigComposer<Config>> {
  // Merge defaults with user options
  const {
    packageJson = true,
    jsonc = false,
    tsconfig = true,
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

  if (jsonc) {
    configs.push(jsoncPreset())
  }

  if (packageJson) {
    configs.push(packageJsonPreset())
  }

  if (tsconfig) {
    // TODO: add tsconfig-specific config here
  }

  const composer = new FlatConfigComposer<Config>().append(...configs)

  return composer
}

export default schplitt
