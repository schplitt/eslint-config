# @schplitt/eslint-config

My ESLint config. Flat config, TypeScript, Vue, Angular, whatever.

## Setup

Run the CLI to set up your project or migrate from legacy config:

```bash
pnpm dlx @schplitt/eslint-config@latest
```

It'll create an `eslint.config.js` and update your `package.json` scripts.

## Manual Install

```bash
pnpm add -D @schplitt/eslint-config eslint
```

Create `eslint.config.ts`:

```ts
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
