/* eslint-disable no-console */
import { defineCommand, runMain } from 'citty'
import pkgJson from '../../package.json' assert { type: 'json' }
import process from 'process'

const main = defineCommand({
  meta: {
    name: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description,
  },
  args: {},
  run() {
    console.log(`\n  ${pkgJson.name} v${pkgJson.version}\n`)
    console.log('  Setup wizard coming soon.\n')
    console.log('  For now, install manually:')
    console.log('    pnpm add -D @schplitt/eslint-config eslint\n')
    console.log('  Then create eslint.config.js:')
    console.log('    import schplitt from \'@schplitt/eslint-config\'')
    console.log('    export default schplitt()\n')
  },
})

runMain(main).catch((err) => {
  console.error(err)
  process.exit(1)
})
