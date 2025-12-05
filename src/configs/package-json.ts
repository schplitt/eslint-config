import type { Config } from "../types";

/**
 * All possible package.json keys in a strict, opinionated order.
 * 
 * Based on:
 * - npm documentation: https://docs.npmjs.com/cli/v11/configuring-npm/package-json
 * - Common community conventions
 * - Logical grouping (metadata → entry points → dependencies → tooling)
 */
const packageJsonKeyOrder = [
    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 1: Package Identity & Metadata
    // Core fields that identify the package
    // ══════════════════════════════════════════════════════════════════════════
    "$schema",
    "publisher",           // VS Code extensions
    "name",
    "displayName",         // VS Code extensions
    "version",
    "private",
    "publishConfig",
    "type",                // "module" | "commonjs"
    "packageManager",      // e.g., "pnpm@8.0.0"

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 2: Package Description & Discovery
    // Fields that help users find and understand the package
    // ══════════════════════════════════════════════════════════════════════════
    "description",
    "keywords",
    "categories",          // VS Code extensions
    "license",
    "author",
    "contributors",
    "maintainers",
    "funding",

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 3: Repository & Links
    // URLs and repository information
    // ══════════════════════════════════════════════════════════════════════════
    "homepage",
    "repository",
    "bugs",

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 4: Entry Points & Exports
    // How the package exposes its code
    // ══════════════════════════════════════════════════════════════════════════
    "sideEffects",
    "imports",             // Package imports (import maps)
    "exports",             // Modern exports field
    "main",                // CommonJS entry point
    "module",              // ESM entry point (bundlers)
    "browser",             // Browser-specific entry point
    "unpkg",               // unpkg CDN entry point
    "jsdelivr",            // jsDelivr CDN entry point
    "types",               // TypeScript types entry
    "typings",             // Alternative to "types"
    "typesVersions",       // TypeScript version-specific types

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 5: Executable & Files
    // Binary executables and files to include
    // ══════════════════════════════════════════════════════════════════════════
    "bin",
    "man",
    "directories",
    "files",

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 6: Scripts
    // npm/pnpm/yarn scripts
    // ══════════════════════════════════════════════════════════════════════════
    "scripts",

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 7: Dependencies
    // All dependency-related fields
    // ══════════════════════════════════════════════════════════════════════════
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "peerDependenciesMeta",
    "optionalDependencies",
    "bundleDependencies",
    "bundledDependencies", // Alternative spelling

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 8: Package Manager Specific
    // pnpm, yarn, npm specific fields
    // ══════════════════════════════════════════════════════════════════════════
    "pnpm",
    "overrides",           // npm overrides
    "resolutions",         // yarn resolutions

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 9: Platform & Engine Requirements
    // Environment constraints
    // ══════════════════════════════════════════════════════════════════════════
    "engines",
    "devEngines",
    "os",
    "cpu",
    "libc",

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 10: Workspaces & Monorepo
    // Monorepo configuration
    // ══════════════════════════════════════════════════════════════════════════
    "workspaces",

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 11: VS Code Extension Specific
    // Fields specific to VS Code extensions
    // ══════════════════════════════════════════════════════════════════════════
    "icon",
    "galleryBanner",
    "preview",
    "activationEvents",
    "contributes",
    "extensionPack",
    "extensionDependencies",
    "extensionKind",

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION 12: Configuration & Tooling
    // Configuration for various tools
    // ══════════════════════════════════════════════════════════════════════════
    "config",
    "husky",
    "simple-git-hooks",
    "gitHooks",
    "lint-staged",
    "nano-staged",
    "eslintConfig",
    "eslintIgnore",
    "prettier",
    "stylelint",
    "browserslist",
    "commitlint",
    "release-it",
    "ava",
    "jest",
    "mocha",
    "nyc",
    "tap",
    "xo",
    "c8",
    "tsup",
    "tsdown",
    "unbuild",
] as const;

/**
 * Sorting order for exports field conditions
 */
const exportsFieldOrder = [
    "types",
    "import",
    "require",
    "default",
] as const;

/**
 * Sorting order for git hooks (client-side only)
 */
const gitHooksOrder = [
    "pre-commit",
    "prepare-commit-msg",
    "commit-msg",
    "post-commit",
    "pre-rebase",
    "post-rewrite",
    "post-checkout",
    "post-merge",
    "pre-push",
    "pre-auto-gc",
] as const;

/**
 * Sort package.json keys and values
 *
 * Requires `eslint-plugin-jsonc` to be installed and configured
 *
 * @see https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-keys.html
 */
export function packageJsonPreset(): Config[] {
    return [
        {
            name: "schplitt/eslint-config:package-json",
            files: ["**/package.json"],
            rules: {
                // Sort the "files" array alphabetically
                "jsonc/sort-array-values": [
                    "error",
                    {
                        order: { type: "asc" },
                        pathPattern: "^files$",
                    },
                ],
                "jsonc/sort-keys": [
                    "error",
                    // Root level keys - use our strict order
                    {
                        order: packageJsonKeyOrder,
                        pathPattern: "^$",
                    },
                    // Dependencies - sort alphabetically
                    {
                        order: { type: "asc" },
                        pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$",
                    },
                    // Resolutions and overrides - sort alphabetically
                    {
                        order: { type: "asc" },
                        pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$",
                    },
                    // pnpm workspace catalogs - sort alphabetically
                    {
                        order: { type: "asc" },
                        pathPattern: "^workspaces\\.catalog$",
                    },
                    {
                        order: { type: "asc" },
                        pathPattern: "^workspaces\\.catalogs\\.[^.]+$",
                    },
                    // Exports field - types first, then import/require, then default
                    {
                        order: exportsFieldOrder,
                        pathPattern: "^exports.*$",
                    },
                    // Git hooks - in execution order
                    {
                        order: gitHooksOrder,
                        pathPattern: "^(?:gitHooks|husky|simple-git-hooks)$",
                    },
                ],
            },
        },
    ];
}