import type { Config } from "../types";

import process from "node:process";
import pluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import pluginErasableSyntaxOnly from "eslint-plugin-erasable-syntax-only";
import { GLOB_TS, GLOB_TSX } from "../globs";



export interface TypescriptOptions {
    /**
     * Whether ESLint is running in an editor environment.
     * When true, certain rules are relaxed for better DX while typing.
     */
    isInEditor?: boolean;
}

/**
 * TypeScript preset with sensible defaults.
 * 
 * @param options - Configuration options
 */
export async function typescriptPreset(options: TypescriptOptions = {}): Promise<Config[]> {
    const { isInEditor = false } = options;
    
    return [
        {
            name: "schplitt/eslint-config:typescript",
            files: [GLOB_TS, GLOB_TSX],
            languageOptions: {
                parser: parserTs,
                parserOptions: {
                    projectService: {
                        allowDefaultProject: ["./*.js"],
                    },
                    tsconfigRootDir: process.cwd(),
                    sourceType: "module",
                },
            },
            plugins: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                "@typescript-eslint": pluginTs as any,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
                "@typescript-eslint/await-thenable": "error",
                "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],
                "@typescript-eslint/no-floating-promises": "error",
                "@typescript-eslint/no-for-in-array": "error",
                "@typescript-eslint/no-implied-eval": "error",
                "@typescript-eslint/no-misused-promises": "error",
                "@typescript-eslint/no-unnecessary-type-assertion": "error",
                "@typescript-eslint/no-unsafe-argument": "error",
                "@typescript-eslint/no-unsafe-assignment": isInEditor ? "warn" : "error",
                "@typescript-eslint/no-unsafe-call": "error",
                "@typescript-eslint/no-unsafe-member-access": "error",
                "@typescript-eslint/no-unsafe-return": "error",
                "@typescript-eslint/promise-function-async": "error",
                "@typescript-eslint/restrict-plus-operands": "error",
                "@typescript-eslint/restrict-template-expressions": "error",
                "@typescript-eslint/return-await": ["error", "in-try-catch"],
                "@typescript-eslint/strict-boolean-expressions": ["error", { allowNullableBoolean: true, allowNullableObject: true }],
                "@typescript-eslint/switch-exhaustiveness-check": "error",
                "@typescript-eslint/unbound-method": "error",

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
