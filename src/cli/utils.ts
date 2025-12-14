import process from 'process'
import { findUp } from 'find-up-simple'
import path from 'path'
import fs from 'fs'
import consola from 'consola'

export async function findClosestPackageJsonDir(
  startingDir: string = process.cwd(),
): Promise<string | null> {
  const foundPath = await findUp('package.json', { cwd: startingDir })
  return foundPath ? path.dirname(foundPath) : null
}

const extensions = [
  'mjs',
  'cjs',
  'js',
  'ts',
  'mts',
  'cts',
]

function getExistingESLintFile(
  dir: string,
): string | null {
  // check every possible eslint config file and delete if it exists
  for (const ext of extensions) {
    const filePath = path.join(dir, `eslint.config.${ext}`)
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }
  return null
}

const eslintConfigTemplate = `import schplitt from '@schplitt/eslint-config'

export default schplitt()
`

export async function createOrOverwriteESLintConfigFile(
  dir: string,
): Promise<void> {
  const file = getExistingESLintFile(dir)
  if (file) {
    // delete the file
    fs.unlink(file, (e) => {
      if (e) {
        consola.warn(`Could not delete existing ESLint config file`)
      }
    })
  }

  const newFilePath = path.join(dir, 'eslint.config.js')
  fs.writeFileSync(newFilePath, eslintConfigTemplate, { encoding: 'utf-8' })
}

const eslintVSCodeSettings = {
  'prettier.enable': false,
  'editor.formatOnSave': false,
  'editor.codeActionsOnSave': {
    'source.fixAll.eslint': 'explicit',
    'source.organizeImports': 'never',
  },
  'eslint.rules.customizations': [
    { rule: 'style/*', severity: 'off', fixable: true },
    { rule: 'format/*', severity: 'off', fixable: true },
    { rule: '*-indent', severity: 'off', fixable: true },
    { rule: '*-spacing', severity: 'off', fixable: true },
    { rule: '*-spaces', severity: 'off', fixable: true },
    { rule: '*-order', severity: 'off', fixable: true },
    { rule: '*-dangle', severity: 'off', fixable: true },
    { rule: '*-newline', severity: 'off', fixable: true },
    { rule: '*quotes', severity: 'off', fixable: true },
    { rule: '*semi', severity: 'off', fixable: true },
  ],
  'eslint.validate': [
    'javascript',
    'javascriptreact',
    'typescript',
    'typescriptreact',
    'vue',
    'html',
    'markdown',
    'json',
    'jsonc',
    'yaml',
    'toml',
    'xml',
    'gql',
    'graphql',
    'astro',
    'svelte',
    'css',
    'less',
    'scss',
    'pcss',
    'postcss',
  ],
}

export function setupVSCodeSettings(projectDir: string): void {
  const vscodeDir = path.join(projectDir, '.vscode')
  const settingsFile = path.join(vscodeDir, 'settings.json')

  // Create .vscode directory if it doesn't exist
  if (!fs.existsSync(vscodeDir)) {
    fs.mkdirSync(vscodeDir, { recursive: true })
  }

  // Load existing settings or create empty object
  let settings: Record<string, any> = {}
  if (fs.existsSync(settingsFile)) {
    try {
      const content = fs.readFileSync(settingsFile, 'utf-8')
      settings = JSON.parse(content)
    } catch {
      consola.warn('Could not parse existing settings.json, will overwrite')
    }
  }

  // Merge eslint settings into existing settings
  settings = {
    ...settings,
    ...eslintVSCodeSettings,
  }

  // Write updated settings back to file
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), { encoding: 'utf-8' })
}
