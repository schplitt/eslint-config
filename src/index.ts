import { FlatConfigComposer } from "eslint-flat-config-utils";
import { jsoncRules, jsoncSetup, packageJsonPreset } from "./configs";
import type { Awaitable, Config, Options } from "./types";

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
    } = options 

    const configs: Awaitable<Config[]>[] = [];

    // Check if ANY JSON-related option is enabled
    const needsJsoncPlugin = packageJson || jsonc || tsconfig;

    if (needsJsoncPlugin) {
        // Enable jsonc plugin and parser ONCE for all JSON files
        configs.push(jsoncSetup());
    }

    // Add specific rules only when their option is enabled
    if (jsonc) {
        configs.push(jsoncRules());
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