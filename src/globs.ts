// Ignore patterns for files and directories
export const IGNORE_GLOBS = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.nitro',
  '**/.next',
  '**/.svelte-kit',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',
  '**/vite.config.*.timestamp-*',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
] as const

/**
 * Glob patterns for TypeScript files
 */
export const TS_GLOB = '**/*.?([cm])ts'
export const TSX_GLOB = '**/*.?([cm])tsx'

export const COMPLETE_JS_TS_GLOB = '**/*.?([cm])[jt]s?([x])'

/**
 * Glob patterns for Markdown files
 */
export const MARKDOWN_GLOB = '**/*.md'
export const MARKDOWN_CODE_GLOB = '**/*.md/**'
export const MARKDOWN_IN_MARKDOWN_GLOB = '**/*.md/*.md'
