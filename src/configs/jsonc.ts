import type { Config } from "../types";
import { interopDefault } from "../utils";

/**
 * Base JSONC setup - enables the parser and plugin.
 * This should be included when ANY JSON-related option is enabled.
 */
export async function jsoncSetup(): Promise<Config[]> {

    const [
        eslintPluginJsonc, jsoncEslintParser,
    ] = await Promise.all([
        interopDefault(import("eslint-plugin-jsonc")),
        interopDefault(import("jsonc-eslint-parser")),
    ]);

    return [
        {
            name: "schplitt/eslint-config:jsonc/setup",
            plugins: {
                jsonc: eslintPluginJsonc as any,
            },
        },
        {
            name: "schplitt/eslint-config:jsonc/parser",
            files: ["**/*.json", "**/*.json5", "**/*.jsonc"],
            languageOptions: {
                parser: jsoncEslintParser,
            },
        },
    ];
}

/**
 * General JSONC rules for all JSON files.
 * Only applied when `jsonc: true` is set.
 */
export function jsoncRules(): Config[] {
    return [
        {
         
        },
    ];
}
