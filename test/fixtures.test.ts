import type { Options } from '../src/types'

import fs from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { execa } from 'execa'
import { glob } from 'tinyglobby'
import { afterAll, beforeAll, it } from 'vitest'

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

/**
 * Run ESLint with a specific configuration and compare output.
 * Follows the antfu/eslint-config testing pattern:
 * 1. Copy input fixtures to a temp directory
 * 2. Generate an ESLint config importing from source
 * 3. Run eslint --fix
 * 4. Compare each file against a file snapshot
 * @param name
 * @param config
 * @param {...any} overrides
 */
function runWithConfig(name: string, config: Options, ...overrides: { rules?: Record<string, unknown> }[]) {
  it.concurrent(name, async ({ expect }) => {
    const from = resolve('fixtures/input')
    const output = resolve('fixtures/output', name)
    const target = resolve('_fixtures', name)

    // Copy input files to target directory
    await fs.cp(from, target, {
      recursive: true,
      filter: (src) => {
        return !src.includes('node_modules')
      },
    })

    // Generate ESLint config file that imports from package
    await fs.writeFile(
      join(target, 'eslint.config.js'),
      `
// @eslint-disable
import schplitt from '@schplitt/eslint-config'

export default schplitt(
  ${JSON.stringify(config)},
  ...${JSON.stringify(overrides ?? [])},
)
`,
    )

    // Run ESLint with --fix, ignoring exit code (some errors may not be auto-fixable)
    try {
      await execa('npx', ['eslint', '.', '--fix'], {
        cwd: target,
        stdio: 'pipe',
      })
    } catch {
      // ESLint exits with code 1 when there are unfixable errors, which is expected
    }

    // Get all files in target
    const files = await glob('**/*', {
      ignore: [
        'node_modules',
        'eslint.config.js',
      ],
      cwd: target,
    })

    // Compare each file with expected output using file snapshots
    await Promise.all(files.map(async (file) => {
      const content = await fs.readFile(join(target, file), 'utf-8')
      const source = await fs.readFile(join(from, file), 'utf-8')
      if (content === source) {
        await fs.rm(join(output, file), { force: true })
        return
      }
      await expect.soft(content).toMatchFileSnapshot(join(output, file))
    }))
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// Test Cases
// ═══════════════════════════════════════════════════════════════════════════

// Default TypeScript configuration (Node.js focused)
// Tests: JavaScript rules, TypeScript rules, Node.js rules, imports, unused-imports
runWithConfig('typescript-default', {
  // Use default options for TypeScript + Node
  pnpm: false,
})

// TypeScript with stylistic formatting
runWithConfig('typescript-stylistic', {
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  pnpm: false,
})

// TypeScript without stylistic formatting
runWithConfig('no-stylistic', {
  stylistic: false,
  pnpm: false,
})

// TypeScript with Angular support
runWithConfig('with-angular', {
  angular: true,
  pnpm: false,
})

// Package.json and tsconfig sorting
runWithConfig('json-sorting', {
  packageJson: true,
  tsconfig: true,
  pnpm: false,
})

// Markdown linting
runWithConfig('markdown', {
  markdown: true,
  pnpm: false,
})

// PNPM workspace configuration
runWithConfig('pnpm-workspace', {
  pnpm: true,
})

// TypeScript with type-aware rules enabled
// Tests: @typescript-eslint type-aware rules (await-thenable, no-floating-promises, etc.)
runWithConfig('typeaware', {
  typeAware: true,
  pnpm: false,
})
