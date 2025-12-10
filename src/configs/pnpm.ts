import type { CommonOptions, Config } from '../types'
import fs from 'node:fs/promises'
import { findUp } from 'find-up-simple'
import { interopDefault } from '../utils'

async function detectCatalogUsage(): Promise<boolean> {
  const workspaceFile = await findUp('pnpm-workspace.yaml')
  if (!workspaceFile)
    return false

  const yaml = await fs.readFile(workspaceFile, 'utf-8')
  return yaml.includes('catalog:') || yaml.includes('catalogs:')
}

export interface PnpmOptions {
  catalogs?: boolean
}

/**
 * PNPM preset with workspace and catalog support.
 * Includes rules for package.json and pnpm-workspace.yaml files.
 * @param options - Configuration options
 */
export async function pnpmPreset(
  options: PnpmOptions & CommonOptions = {},
): Promise<Config[]> {
  const {
    catalogs = await detectCatalogUsage(),
    isInEditor = false,
  } = options

  const [
    pluginPnpm,
    yamlParser,
    jsoncParser,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-pnpm')),
    interopDefault(import('yaml-eslint-parser')),
    interopDefault(import('jsonc-eslint-parser')),
  ])

  return [
    {
      files: [
        'package.json',
        '**/package.json',
      ],
      languageOptions: {
        parser: jsoncParser,
      },
      name: 'schplitt/eslint-config:pnpm/package-json',
      plugins: {
        pnpm: pluginPnpm,
      },
      rules: {
        ...(catalogs
          ? {
              // Enforce catalog usage for dependencies
              'pnpm/json-enforce-catalog': [
                'error',
                { autofix: !isInEditor },
              ],
            }
          : {}),
        // Prefer workspace protocol for local dependencies
        'pnpm/json-prefer-workspace-settings': [
          'error',
          { autofix: !isInEditor },
        ],
        // Validate catalog references in dependencies
        'pnpm/json-valid-catalog': [
          'error',
          { autofix: !isInEditor },
        ],
      },
    },
    {
      files: ['pnpm-workspace.yaml'],
      languageOptions: {
        parser: yamlParser,
      },
      name: 'schplitt/eslint-config:pnpm/pnpm-workspace-yaml',
      plugins: {
        pnpm: pluginPnpm,
      },
      rules: {
        // Enforce settings in pnpm-workspace.yaml
        'pnpm/yaml-enforce-settings': ['error', {
          settings: {
            catalogMode: 'prefer',
            shellEmulator: true,
            trustPolicy: 'no-downgrade',
          },
        }],
        // Disallow duplicate catalog items
        'pnpm/yaml-no-duplicate-catalog-item': 'error',
        // Disallow unused catalog items
        'pnpm/yaml-no-unused-catalog-item': 'error',
      },
    },
    {
      files: ['pnpm-workspace.yaml'],
      name: 'schplitt/eslint-config:pnpm/pnpm-workspace-yaml-sort',
      rules: {
        'yml/sort-keys': [
          'error',
          {
            order: [
              // Settings
              // @keep-sorted
              ...[
                'cacheDir',
                'catalogMode',
                'cleanupUnusedCatalogs',
                'dedupeDirectDeps',
                'deployAllFiles',
                'enablePrePostScripts',
                'engineStrict',
                'extendNodePath',
                'hoist',
                'hoistPattern',
                'hoistWorkspacePackages',
                'ignoreCompatibilityDb',
                'ignoreDepScripts',
                'ignoreScripts',
                'ignoreWorkspaceRootCheck',
                'managePackageManagerVersions',
                'minimumReleaseAge',
                'minimumReleaseAgeExclude',
                'modulesDir',
                'nodeLinker',
                'nodeVersion',
                'optimisticRepeatInstall',
                'packageManagerStrict',
                'packageManagerStrictVersion',
                'preferSymlinkedExecutables',
                'preferWorkspacePackages',
                'publicHoistPattern',
                'registrySupportsTimeField',
                'requiredScripts',
                'resolutionMode',
                'savePrefix',
                'scriptShell',
                'shamefullyHoist',
                'shellEmulator',
                'stateDir',
                'supportedArchitectures',
                'symlink',
                'tag',
                'trustPolicy',
                'trustPolicyExclude',
                'updateNotifier',
              ],

              // Packages and dependencies
              'packages',
              'overrides',
              'patchedDependencies',
              'catalog',
              'catalogs',

              // Other
              // @keep-sorted
              ...[
                'allowedDeprecatedVersions',
                'allowNonAppliedPatches',
                'configDependencies',
                'ignoredBuiltDependencies',
                'ignoredOptionalDependencies',
                'neverBuiltDependencies',
                'onlyBuiltDependencies',
                'onlyBuiltDependenciesFile',
                'packageExtensions',
                'peerDependencyRules',
              ],
            ],
            pathPattern: '^$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '.*',
          },
        ],
      },
    },
  ]
}
