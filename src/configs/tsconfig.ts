import type { Config } from '../types'
import { interopDefault } from '../utils'

/**
 * All possible tsconfig.json keys in a strict, opinionated order.
 *
 * Based on:
 * - TypeScript documentation: https://www.typescriptlang.org/tsconfig/
 * - Logical grouping (metadata → files → compiler options → references)
 */
const tsconfigKeyOrder = [
  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 1: Schema & Extension
  // ══════════════════════════════════════════════════════════════════════════
  '$schema',
  'extends',

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 2: Compiler Options
  // All TypeScript compiler configuration
  // ══════════════════════════════════════════════════════════════════════════
  'compilerOptions',

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 3: File Selection
  // What files are included in the compilation
  // ══════════════════════════════════════════════════════════════════════════
  'files',
  'include',
  'exclude',

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 4: Project References
  // For composite projects
  // ══════════════════════════════════════════════════════════════════════════
  'references',

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 5: Watch Options
  // Configure watch mode behavior
  // ══════════════════════════════════════════════════════════════════════════
  'watchOptions',

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 6: Type Acquisition (JavaScript projects)
  // ══════════════════════════════════════════════════════════════════════════
  'typeAcquisition',
] as const

/**
 * Sorting order for compilerOptions
 *
 * Grouped by functionality following TypeScript's official documentation structure
 */
const compilerOptionsOrder = [
  // ──────────────────────────────────────────────────────────────────────────
  // Type Checking
  // ──────────────────────────────────────────────────────────────────────────
  'allowUnreachableCode',
  'allowUnusedLabels',
  'alwaysStrict',
  'exactOptionalPropertyTypes',
  'noFallthroughCasesInSwitch',
  'noImplicitAny',
  'noImplicitOverride',
  'noImplicitReturns',
  'noImplicitThis',
  'noPropertyAccessFromIndexSignature',
  'noUncheckedIndexedAccess',
  'noUnusedLocals',
  'noUnusedParameters',
  'strict',
  'strictBindCallApply',
  'strictBuiltinIteratorReturn',
  'strictFunctionTypes',
  'strictNullChecks',
  'strictPropertyInitialization',
  'useUnknownInCatchVariables',

  // ──────────────────────────────────────────────────────────────────────────
  // Modules
  // ──────────────────────────────────────────────────────────────────────────
  'allowArbitraryExtensions',
  'allowImportingTsExtensions',
  'allowUmdGlobalAccess',
  'baseUrl',
  'customConditions',
  'module',
  'moduleResolution',
  'moduleSuffixes',
  'noResolve',
  'noUncheckedSideEffectImports',
  'paths',
  'resolveJsonModule',
  'resolvePackageJsonExports',
  'resolvePackageJsonImports',
  'rewriteRelativeImportExtensions',
  'rootDir',
  'rootDirs',
  'typeRoots',
  'types',

  // ──────────────────────────────────────────────────────────────────────────
  // Emit
  // ──────────────────────────────────────────────────────────────────────────
  'declaration',
  'declarationDir',
  'declarationMap',
  'downlevelIteration',
  'emitBOM',
  'emitDeclarationOnly',
  'importHelpers',
  'inlineSourceMap',
  'inlineSources',
  'mapRoot',
  'newLine',
  'noEmit',
  'noEmitHelpers',
  'noEmitOnError',
  'outDir',
  'outFile',
  'preserveConstEnums',
  'removeComments',
  'sourceMap',
  'sourceRoot',
  'stripInternal',

  // ──────────────────────────────────────────────────────────────────────────
  // JavaScript Support
  // ──────────────────────────────────────────────────────────────────────────
  'allowJs',
  'checkJs',
  'maxNodeModuleJsDepth',

  // ──────────────────────────────────────────────────────────────────────────
  // Editor Support
  // ──────────────────────────────────────────────────────────────────────────
  'disableSizeLimit',
  'plugins',

  // ──────────────────────────────────────────────────────────────────────────
  // Interop Constraints
  // ──────────────────────────────────────────────────────────────────────────
  'allowSyntheticDefaultImports',
  'erasableSyntaxOnly',
  'esModuleInterop',
  'forceConsistentCasingInFileNames',
  'isolatedDeclarations',
  'isolatedModules',
  'preserveSymlinks',
  'verbatimModuleSyntax',

  // ──────────────────────────────────────────────────────────────────────────
  // Backwards Compatibility
  // ──────────────────────────────────────────────────────────────────────────
  'charset',
  'importsNotUsedAsValues',
  'keyofStringsOnly',
  'noImplicitUseStrict',
  'noStrictGenericChecks',
  'out',
  'preserveValueImports',
  'suppressExcessPropertyErrors',
  'suppressImplicitAnyIndexErrors',

  // ──────────────────────────────────────────────────────────────────────────
  // Language and Environment
  // ──────────────────────────────────────────────────────────────────────────
  'emitDecoratorMetadata',
  'experimentalDecorators',
  'jsx',
  'jsxFactory',
  'jsxFragmentFactory',
  'jsxImportSource',
  'lib',
  'libReplacement',
  'moduleDetection',
  'noLib',
  'reactNamespace',
  'target',
  'useDefineForClassFields',

  // ──────────────────────────────────────────────────────────────────────────
  // Compiler Diagnostics
  // ──────────────────────────────────────────────────────────────────────────
  'diagnostics',
  'explainFiles',
  'extendedDiagnostics',
  'generateCpuProfile',
  'generateTrace',
  'listEmittedFiles',
  'listFiles',
  'noCheck',
  'traceResolution',

  // ──────────────────────────────────────────────────────────────────────────
  // Projects
  // ──────────────────────────────────────────────────────────────────────────
  'composite',
  'disableReferencedProjectLoad',
  'disableSolutionSearching',
  'disableSourceOfProjectReferenceRedirect',
  'incremental',
  'tsBuildInfoFile',

  // ──────────────────────────────────────────────────────────────────────────
  // Output Formatting
  // ──────────────────────────────────────────────────────────────────────────
  'noErrorTruncation',
  'preserveWatchOutput',
  'pretty',

  // ──────────────────────────────────────────────────────────────────────────
  // Completeness
  // ──────────────────────────────────────────────────────────────────────────
  'skipDefaultLibCheck',
  'skipLibCheck',
] as const

/**
 * Sorting order for watchOptions
 */
const watchOptionsOrder = [
  'watchFile',
  'watchDirectory',
  'fallbackPolling',
  'synchronousWatchDirectory',
  'excludeDirectories',
  'excludeFiles',
] as const

/**
 * Sorting order for typeAcquisition
 */
const typeAcquisitionOrder = [
  'enable',
  'include',
  'exclude',
  'disableFilenameBasedTypeAcquisition',
] as const

/**
 * Sort tsconfig.json keys and values
 *
 * Includes jsonc plugin and parser setup.
 *
 * @see https://www.typescriptlang.org/tsconfig/
 * @see https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-keys.html
 */
export async function tsconfigPreset(): Promise<Config[]> {
  const [
    eslintPluginJsonc,
    jsoncEslintParser,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-jsonc')),
    interopDefault(import('jsonc-eslint-parser')),
  ])

  return [
    {
      name: 'schplitt/eslint-config:tsconfig',
      files: ['**/tsconfig.json', '**/tsconfig.*.json'],
      plugins: {
        jsonc: eslintPluginJsonc as any,
      },
      languageOptions: {
        parser: jsoncEslintParser,
      },
      rules: {
        // Sort root level keys - use our strict order
        'jsonc/sort-keys': [
          'error',
          // Root level keys
          {
            order: tsconfigKeyOrder,
            pathPattern: '^$',
          },
          // compilerOptions - sort by functionality groups
          {
            order: compilerOptionsOrder,
            pathPattern: '^compilerOptions$',
          },
          // lib array - sort alphabetically
          {
            order: { type: 'asc' },
            pathPattern: '^compilerOptions\\.lib$',
          },
          // types array - sort alphabetically
          {
            order: { type: 'asc' },
            pathPattern: '^compilerOptions\\.types$',
          },
          // paths - sort keys alphabetically
          {
            order: { type: 'asc' },
            pathPattern: '^compilerOptions\\.paths$',
          },
          // watchOptions - sort by our order
          {
            order: watchOptionsOrder,
            pathPattern: '^watchOptions$',
          },
          // typeAcquisition - sort by our order
          {
            order: typeAcquisitionOrder,
            pathPattern: '^typeAcquisition$',
          },
        ],
        // Sort arrays in tsconfig
        'jsonc/sort-array-values': [
          'error',
          // files array
          {
            order: { type: 'asc' },
            pathPattern: '^files$',
          },
          // include array
          {
            order: { type: 'asc' },
            pathPattern: '^include$',
          },
          // exclude array
          {
            order: { type: 'asc' },
            pathPattern: '^exclude$',
          },
          // lib array in compilerOptions
          {
            order: { type: 'asc' },
            pathPattern: '^compilerOptions\\.lib$',
          },
          // types array in compilerOptions
          {
            order: { type: 'asc' },
            pathPattern: '^compilerOptions\\.types$',
          },
          // typeRoots array in compilerOptions
          {
            order: { type: 'asc' },
            pathPattern: '^compilerOptions\\.typeRoots$',
          },
          // rootDirs array in compilerOptions
          {
            order: { type: 'asc' },
            pathPattern: '^compilerOptions\\.rootDirs$',
          },
          // excludeDirectories in watchOptions
          {
            order: { type: 'asc' },
            pathPattern: '^watchOptions\\.excludeDirectories$',
          },
          // excludeFiles in watchOptions
          {
            order: { type: 'asc' },
            pathPattern: '^watchOptions\\.excludeFiles$',
          },
          // typeAcquisition include/exclude
          {
            order: { type: 'asc' },
            pathPattern: '^typeAcquisition\\.(?:include|exclude)$',
          },
        ],
      },
    },
  ]
}
