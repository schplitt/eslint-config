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

  // ignore skills folders by default (https://github.com/vercel-labs/skills)
  '**/.github/skills/**',
  '**/.agents/skills/**',
  '**/.agent/skills/**',
  '**/.augment/rules/**',
  '**/.claude/skills/**',
  '**/.cline/skills/**',
  '**/.codebuddy/skills/**',
  '**/.commandcode/skills/**',
  '**/.continue/skills/**',
  '**/.crush/skills/**',
  '**/.cursor/skills/**',
  '**/.factory/skills/**',
  '**/.goose/skills/**',
  '**/.junie/skills/**',
  '**/.iflow/skills/**',
  '**/.kilocode/skills/**',
  '**/.kiro/skills/**',
  '**/.kode/skills/**',
  '**/.mcpjam/skills/**',
  '**/.vibe/skills/**',
  '**/.mux/skills/**',
  '**/.openhands/skills/**',
  '**/.pi/skills/**',
  '**/.qoder/skills/**',
  '**/.qwen/skills/**',
  '**/.roo/skills/**',
  '**/.trae/skills/**',
  '**/.windsurf/skills/**',
  '**/.zencoder/skills/**',
  '**/.neovate/skills/**',
  '**/.pochi/skills/**',
  '**/.adal/skills/**',
] as const

/**
 * Glob patterns for TypeScript files
 */
export const TS_GLOB = '**/*.?([cm])ts'
export const TSX_GLOB = '**/*.?([cm])tsx'

export const COMPLETE_JS_TS_GLOB = '**/*.?([cm])[jt]s?([x])'

/**
 * Glob patterns for YAML files
 */
export const YAML_GLOB = '**/*.y?(a)ml'

/**
 * Glob patterns for Markdown files
 */
export const MARKDOWN_GLOB = '**/*.md'

/**
 * Create Angular-specific glob patterns based on project path
 * @param projectPath - The root path for Angular files (default: 'app')
 */
export function createAngularGlobs(projectPath: string = 'app') {
  // Normalize path - remove leading/trailing slashes
  const normalizedPath = projectPath.replaceAll(/^\/+|\/+$/g, '')

  return {
    ts: `**/${normalizedPath}/**/*.?([cm])ts`,
    tsx: `**/${normalizedPath}/**/*.?([cm])tsx`,
    html: `**/${normalizedPath}/**/*.html`,
  }
}
export const MARKDOWN_CODE_GLOB = '**/*.md/**'
export const MARKDOWN_IN_MARKDOWN_GLOB = '**/*.md/*.md'

export const VUE_GLOB = '**/*.vue'
