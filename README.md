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

## License

MIT

## Inspiration

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)