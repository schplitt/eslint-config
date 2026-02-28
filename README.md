# schplitt/eslint-config

My ESLint config. Flat config, TypeScript, Vue, Angular, whatever.
Uses [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic) for consistent code styling instead of Prettier.

## Setup

Run the CLI to set up your project or migrate from legacy config:

```sh
pnpm dlx @schplitt/eslint-config@latest
```

It'll create an `eslint.config.js` and update your `package.json` scripts.

## Manual Install

```sh
pnpm add -D @schplitt/eslint-config eslint
```

Create `eslint.config.js`:

```js
import schplitt from '@schplitt/eslint-config'

export default schplitt()
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Development

### Testing Infrastructure

This project uses **fixture-based testing** to validate ESLint configurations. The test suite ensures that ESLint rules work correctly before and after potential migrations (e.g., to oxlint).

#### How It Works

1. **Build the package**: Tests import from the built package (`@schplitt/eslint-config`), not source files
   ```sh
   pnpm build
   ```

2. **Test execution**: Each test case:
   - Copies `fixtures/input/*` files to a temp directory `_fixtures/{test-name}/`
   - Generates an `eslint.config.js` with the test configuration
   - Runs `npx eslint . --fix` in that directory
   - Compares the fixed files against expected snapshots in `fixtures/output/{test-name}/`

3. **Snapshot behavior**:
   - **Files ESLint modifies** → Saved in `fixtures/output/{test-name}/` and committed to git
   - **Files ESLint doesn't change** → Deleted from `fixtures/output/{test-name}/` (no snapshot needed)
   - This is the correct antfu/eslint-config pattern: only track files with actual changes

#### File Structure

```
fixtures/
  input/          # Source files with intentional linting violations
    typescript.ts
    javascript.js
    markdown.md
    ...
  output/         # Expected output after ESLint --fix (git tracked)
    typescript-default/
      # Only files that ESLint changes appear here
    typescript-stylistic/
    with-angular/
    ...
```

#### Running Tests

```sh
# Run all tests (builds first)
pnpm test

# Watch mode (builds first)
pnpm test:watch

# Manual debugging
pnpm build
cd _fixtures/debug
npx eslint . --fix
```

#### What Gets Committed

- ✅ **All files in `fixtures/input/`** - The source fixtures with violations
- ✅ **Modified files in `fixtures/output/{test}/`** - Files that ESLint changes
- ❌ **Unchanged files** - Automatically deleted by tests (correct behavior)
- ❌ **`_fixtures/` directory** - Temp directory (in `.gitignore`)

#### Adding New Tests

1. Add test case in `test/fixtures.test.ts`:
   ```ts
   runWithConfig('my-new-test', {
     // your config options
     angular: true,
   })
   ```

2. Run tests - snapshots are auto-generated in `fixtures/output/my-new-test/`

3. Review and commit the new snapshot files

## License

MIT

## Inspiration

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)