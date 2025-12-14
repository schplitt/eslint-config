import { defineCommand, runMain } from 'citty'
import pkgJson from '../../package.json' assert { type: 'json' }
import process from 'process'
import {
  addDevDependency,
} from 'nypm'
import { createOrOverwriteESLintConfigFile, findClosestPackageJsonDir, setupVSCodeSettings } from './utils'
import consola from 'consola'

const main = defineCommand({
  meta: {
    name: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description,
  },
  args: {},

  run: async () => {
    // things we have to do/set up
    // 1. check if we are in a git context
    // if yes we want to get the root dir of the git repo
    // if no, we find the closest package.json upwards and use that dir as root

    // when we have found the dir we want to work in

    // we create the eslint.config.ts file with with the default schplitt config
    // we have to add the dependencies
    // we could however also you nypm and install them directly and not only add them to package.json
    // also the .vscode settings should be created/added here on user feedback

    const projectDir = await findClosestPackageJsonDir()

    if (!projectDir) {
      consola.error('Could not find a package.json in this or any parent directory. Please run this command inside a project.')
      return
    }

    await addDevDependency(['eslint@latest', `${pkgJson.name}@latest`], { cwd: projectDir, silent: true })

    createOrOverwriteESLintConfigFile(projectDir)

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
