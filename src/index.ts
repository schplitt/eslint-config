import { FlatConfigComposer } from "eslint-flat-config-utils";
import { jsoncPreset, packageJsonPreset } from "./configs";
import type { Awaitable, Config, Options } from "./types";
import { ignoresPreset } from "./configs/ignores";
import { jsdocPreset } from "./configs/jsdoc";



/**
 * Create an ESLint flat config with sensible defaults.
 * @returns FlatConfigComposer that can be used directly as ESLint config
 */
export function schplitt(options: Options = {}): FlatConfigComposer<Config> {
    // Merge defaults with user options
    const {
        packageJson = true,
        jsonc = false,
        tsconfig = true,
        ignores = [],
        stylistic = true,
    } = options 

    const configs: Awaitable<Config[]>[] = [];

    // defaults
    configs.push(
        ignoresPreset(ignores),
        jsdocPreset({ stylistic })
    )

    // Each config brings its own plugin and parser setup
    // They will override themselves, which is fine

    if (jsonc) {
        configs.push(jsoncPreset());
    }

    if (packageJson) {
        configs.push(packageJsonPreset());
    }

    if (tsconfig) {
        // TODO: Add tsconfig rules
    }


    const composer = new FlatConfigComposer<Config>();
    
    return composer.append(...configs);
}

export default schplitt;