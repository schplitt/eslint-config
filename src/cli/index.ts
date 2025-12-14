#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import pkgJson from '../../package.json' assert { type: 'json' }
import process from 'process'
import {
  addDevDependency,
} from 'nypm'
import { addESLintScriptsToPackageJson, createOrOverwriteESLintConfigFile, findClosestPackageJsonDir, setupVSCodeSettings } from './utils'
import consola from 'consola'

const main = defineCommand({
  meta: {
    name: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description,
  },
  args: {},

  run: async () => {
    const projectDir = await findClosestPackageJsonDir()

    if (!projectDir) {
      consola.error('Could not find a package.json in this or any parent directory. Please run this command inside a project.')
      return
    }

    await addDevDependency(['eslint@latest', `${pkgJson.name}@latest`], { cwd: projectDir, silent: true })

    createOrOverwriteESLintConfigFile(projectDir)

    addESLintScriptsToPackageJson(projectDir)

    // now we ask the user if he ALSO wants to set up the .vscode settings for ESLint

    const answer = await consola.prompt('Do you want to set up VSCode settings for ESLint?', {
      type: 'confirm',
      cancel: 'reject',
    })

    if (answer) {
      setupVSCodeSettings(projectDir)
    }

    consola.success('ESLint has been successfully set up!')
  },
})

runMain(main).catch((err) => {
  console.error(err)
  process.exit(1)
})
