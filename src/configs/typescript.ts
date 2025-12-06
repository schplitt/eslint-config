import type { Config } from "../types";

import process from "node:process";
import pluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import pluginErasableSyntaxOnly from "eslint-plugin-erasable-syntax-only";
import { TSX_GLOB, TS_GLOB } from "../globs";



/**
 * Create config file names with all JavaScript/TypeScript extensions.
 * Generates combinations of .js, .mjs, .cjs for JavaScript and .ts, .mts, .cts for TypeScript.
 * 
 * @param baseName - The base name without extension (e.g., "eslint.config")
 * @returns Array of filenames with all possible extensions
 * 
 * @example
 * ```ts
 * createConfigNames("vite.config")
 * // => ["vite.config.js", "vite.config.mjs", "vite.config.cjs", 
 * //      "vite.config.ts", "vite.config.mts", "vite.config.cts"]
 * ```
 */
function createConfigNames(baseName: string): string[] {
    return [
        `${baseName}.js`,
        `${baseName}.mjs`,
        `${baseName}.cjs`,
        `${baseName}.ts`,
        `${baseName}.mts`,
        `${baseName}.cts`,
    ];
}

/**
 * Default config files that are allowed in the project service's default project.
 * These are common root-level config files that typically aren't included in tsconfig.json.
 */
export const DEFAULT_PROJECT_FILES: string[] = [
    ...createConfigNames("eslint.config"),
    ...createConfigNames("vite.config"),
    ...createConfigNames("tsdown.config"),
    ...createConfigNames("tsup.config"),
    ...createConfigNames("nitro.config"),
    ...createConfigNames("vitest.config"),
    ...createConfigNames("playwright.config"),
    ...createConfigNames("tailwind.config"),
    ...createConfigNames("postcss.config"),
    ...createConfigNames("uno.config"),
];

export interface TypescriptOptions {

    isInEditor?: boolean;


    typeAware?: TypeAwareOptions;
}

export type TypeAwareOptions = boolean | {
    /**
     * Additional files to include in the project service's allowDefaultProject.
     * These files will be type-checked even if not included in tsconfig.json.
     * Only used when typeAware is enabled.
     * 
     * @example
     * ```ts
     * typescriptPreset({
     *   typeAware: true,
     *   extraFilesForDefaultProject: ["custom.config.ts", "scripts/build.ts"]
     * })
     * ```
     */
    extraFilesForDefaultProject?: string[];
}

/**
 * TypeScript preset with sensible defaults.
 * 
 * @param options - Configuration options
 */
export async function typescriptPreset(options: TypescriptOptions = {}): Promise<Config[]> {
    const { isInEditor = false, typeAware = false } = options;
    
    return [
        {
            name: "schplitt/eslint-config:typescript",
            files: [TS_GLOB, TSX_GLOB],
            languageOptions: {
                parser: parserTs,
                parserOptions: typeAware ? {
                    projectService: {
                        allowDefaultProject: [...DEFAULT_PROJECT_FILES, ... ((typeAware && typeof typeAware === 'object') ? typeAware?.extraFilesForDefaultProject ?? [] : [])],
                    },
                    tsconfigRootDir: process.cwd(),
                    sourceType: "module",
                } : {
                    sourceType: "module",
                },
            },
            plugins: {
                "@typescript-eslint": pluginTs as any,
                "erasable-syntax-only": pluginErasableSyntaxOnly as any,
            },
            rules: {
                // ══════════════════════════════════════════════════════════════
                // Disable base ESLint rules that are handled by TypeScript
                // ══════════════════════════════════════════════════════════════
                "dot-notation": "off",
                "no-dupe-class-members": "off",
                "no-implied-eval": "off",
                "no-redeclare": "off",
                "no-use-before-define": "off",
                "no-useless-constructor": "off",

                // ══════════════════════════════════════════════════════════════
                // TypeScript ESLint Rules
                // ══════════════════════════════════════════════════════════════
                "@typescript-eslint/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description" }],
                "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
                "@typescript-eslint/consistent-type-imports": ["error", {
                    disallowTypeAnnotations: false,
                    fixStyle: "separate-type-imports",
                    prefer: "type-imports",
                }],
                "@typescript-eslint/method-signature-style": ["error", "property"],
                "@typescript-eslint/no-dupe-class-members": "error",
                "@typescript-eslint/no-dynamic-delete": "off",
                "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "always" }],
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-extraneous-class": "off",
                "@typescript-eslint/no-import-type-side-effects": "error",
                "@typescript-eslint/no-invalid-void-type": "off",
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/no-redeclare": ["error", { builtinGlobals: false }],
                "@typescript-eslint/no-require-imports": "error",
                "@typescript-eslint/no-unused-expressions": ["error", {
                    allowShortCircuit: true,
                    allowTaggedTemplates: true,
                    allowTernary: true,
                }],
                "@typescript-eslint/no-unused-vars": "off",
                "@typescript-eslint/no-use-before-define": ["error", { classes: false, functions: false, variables: true }],
                "@typescript-eslint/no-useless-constructor": "off",
                "@typescript-eslint/no-wrapper-object-types": "error",
                "@typescript-eslint/triple-slash-reference": "off",
                "@typescript-eslint/unified-signatures": "off",

                // ══════════════════════════════════════════════════════════════
                // Type-Aware Rules (require projectService)
                // ══════════════════════════════════════════════════════════════
                ...(typeAware ? {
                    "@typescript-eslint/await-thenable": "error",
                    "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],
                    "@typescript-eslint/no-floating-promises": "error",
                    "@typescript-eslint/no-for-in-array": "error",
                    "@typescript-eslint/no-implied-eval": "error",
                    "@typescript-eslint/no-misused-promises": "error",
                    "@typescript-eslint/no-unnecessary-type-assertion": "error",
                    "@typescript-eslint/no-unsafe-argument": isInEditor ? "warn" : "error",
                    "@typescript-eslint/no-unsafe-assignment": isInEditor ? "warn" : "error",
                    "@typescript-eslint/no-unsafe-call": isInEditor ? "warn" : "error",
                    "@typescript-eslint/no-unsafe-member-access": ["error", { allowOptionalChaining: true}],
                    "@typescript-eslint/no-unsafe-return": isInEditor ? "warn" : "error",
                    "@typescript-eslint/promise-function-async": "error",
                    "@typescript-eslint/restrict-plus-operands": "error",
                    "@typescript-eslint/restrict-template-expressions": "error",
                    "@typescript-eslint/return-await": ["error", "in-try-catch"],
                    "@typescript-eslint/switch-exhaustiveness-check": "error",
                    "@typescript-eslint/unbound-method": "error",
                } : {}),

                // ══════════════════════════════════════════════════════════════
                // Erasable Syntax Only Rules
                // Ensures TypeScript-only syntax can be erased without runtime impact
                // ══════════════════════════════════════════════════════════════
                "erasable-syntax-only/enums": "error",
                "erasable-syntax-only/import-aliases": "error",
                "erasable-syntax-only/namespaces": "error",
                "erasable-syntax-only/parameter-properties": "error",
            },
        },
    ];
}
