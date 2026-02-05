import type { Options } from '../src/types'

import fs from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { execa } from 'execa'
import { glob } from 'tinyglobby'
import { afterAll, beforeAll, it } from 'vitest'

const timeout = 120_000

// Get the absolute path to the dist directory
const distPath = resolve(import.meta.dirname, '..', 'dist', 'index.mjs')

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

/**
 * Run ESLint with a specific configuration and compare output
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

    // Calculate relative path from target to dist
    const relativeDist = relative(target, distPath).replace(/\\/g, '/')

    // Generate ESLint config file with relative import
    await fs.writeFile(
      join(target, 'eslint.config.mjs'),
      `
/* eslint-disable */
import schplitt from '${relativeDist}'

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
    }
    catch {
      // ESLint exits with code 1 when there are unfixable errors, which is expected
    }

    // Get all files in target
    const files = await glob('**/*', {
      ignore: [
        'node_modules',
        'eslint.config.mjs',
      ],
      cwd: target,
    })

    // Compare each file with expected output
    await Promise.all(files.map(async (file) => {
      const content = await fs.readFile(join(target, file), 'utf-8')
      const source = await fs.readFile(join(from, file), 'utf-8')
      const outputPath = join(output, file)

      // If no changes, remove the output file (if it exists)
      if (content === source) {
        await fs.rm(outputPath, { force: true })
        return
      }

      // Ensure output directory exists
      await fs.mkdir(dirname(outputPath), { recursive: true })

      // Check if expected output exists
      let expected: string | undefined
      try {
        expected = await fs.readFile(outputPath, 'utf-8')
      }
      catch {
        // File doesn't exist - create it and fail the test to alert about new snapshot
        await fs.writeFile(outputPath, content)
        throw new Error(`New snapshot created for ${file}. Run tests again to verify.`)
      }

      // Compare with expected
      expect(content).toBe(expected)
    }))
  }, timeout)
}

// ═══════════════════════════════════════════════════════════════════════════
// Test Cases
// ═══════════════════════════════════════════════════════════════════════════

// Default TypeScript configuration (Node.js focused)
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
