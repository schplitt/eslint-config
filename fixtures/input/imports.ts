// Test file for import and type import sorting

// Duplicate imports (should be deduplicated)
import { readFile } from 'node:fs/promises'
import { readFile as readFileAlias } from 'node:fs/promises'

// Type imports mixed with value imports
import type { Buffer } from 'node:buffer'
import { setTimeout } from 'node:timers/promises'
import type { Stats } from 'node:fs'
import path from 'node:path'
import type { URL } from 'node:url'

// Missing newline after imports

export async function main() {
  const content = await readFile('test.txt', 'utf-8')
  await setTimeout(100)
  const p = path.join('a', 'b')
  console.log(content, p)
}

// Using types only as type annotations (to verify type imports)
export function processBuffer(buf: Buffer): Stats | null {
  console.log(buf)
  return null
}

export function processUrl(url: URL): string {
  return url.href
}

export { readFileAlias }
