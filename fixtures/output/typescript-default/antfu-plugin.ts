// Antfu plugin linting scenarios
// Tests: eslint-plugin-antfu rules

// ═══════════════════════════════════════════════════════════════════════════
// antfu/import-dedupe - Remove duplicate imports
// ═══════════════════════════════════════════════════════════════════════════
import { join } from 'node:path'
import { join as pathJoin } from 'node:path'

// ═══════════════════════════════════════════════════════════════════════════
// antfu/no-import-dist - Don't import from dist folder
// ═══════════════════════════════════════════════════════════════════════════
// Uncomment to test: import { something } from './dist/index.js'

// ═══════════════════════════════════════════════════════════════════════════
// antfu/no-import-node-modules-by-path - Don't import node_modules by path
// ═══════════════════════════════════════════════════════════════════════════
// Uncomment to test: import { something } from './node_modules/pkg/index.js'

// ═══════════════════════════════════════════════════════════════════════════
// antfu/consistent-list-newline - Consistent newlines in lists
// ═══════════════════════════════════════════════════════════════════════════
const items = ['one', 'two', 'three', 'four']

const config = { a: 1, b: 2, c: 3, d: 4 }

// Correct: all on one line
const singleLine = { x: 1, y: 2, z: 3 }

// Correct: all on separate lines
const multiLine = {
  x: 1,
  y: 2,
  z: 3,
}

// ═══════════════════════════════════════════════════════════════════════════
// antfu/no-top-level-await - No top-level await in modules
// ═══════════════════════════════════════════════════════════════════════════
// Uncomment to test: const data = await Promise.resolve('test')

// ═══════════════════════════════════════════════════════════════════════════
// Function using the imports
// ═══════════════════════════════════════════════════════════════════════════
function buildPath(...parts: string[]): string {
  return join(...parts)
}

function buildPathAlias(...parts: string[]): string {
  return pathJoin(...parts)
}

// ═══════════════════════════════════════════════════════════════════════════
// Usage
// ═══════════════════════════════════════════════════════════════════════════
const path1 = buildPath('a', 'b', 'c')
const path2 = buildPathAlias('x', 'y', 'z')

console.log(path1, path2, items, config, singleLine, multiLine)
