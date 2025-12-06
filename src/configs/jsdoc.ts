import type { Config } from '../types'

import { interopDefault } from '../utils'

export async function jsdocPreset(options: { stylistic?: boolean } = {}): Promise<Config[]> {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'schplitt/eslint-config:jsdoc',
      plugins: {
        jsdoc: await interopDefault(import('eslint-plugin-jsdoc')),
      },
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-types': 'warn',
        "jsdoc/convert-to-jsdoc-comments": ["warn", {
          "enforceJsdocLineStyle": "multi",
          "lineOrBlockStyle": "block",
          "contexts": [
            "FunctionDeclaration",
            "FunctionExpression", 
            "ArrowFunctionExpression",
            "ClassDeclaration",
            "MethodDefinition",
            "VariableDeclaration",
            "TSInterfaceDeclaration",
            "TSTypeAliasDeclaration",
          ],
          "allowedPrefixes": ["*"],
        }],
        'jsdoc/empty-tags': 'warn',
        "jsdoc/escape-inline-tags": ["warn", {"enableFixer":true}],
        'jsdoc/implements-on-classes': 'warn',
        "jsdoc/no-bad-blocks": "warn",
        'jsdoc/no-defaults': 'warn',
        'jsdoc/no-multi-asterisks': 'warn',
        "jsdoc/no-blank-blocks": "warn",
        "jsdoc/require-param": "warn",
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-property': 'warn',
        'jsdoc/require-property-description': 'warn',
        'jsdoc/require-property-name': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-yields-check': 'warn',

        ...stylistic
          ? {
              'jsdoc/check-alignment': 'warn',
              "jsdoc/multiline-blocks": ["warn", { "noSingleLineBlocks" :true}],
            }
          : {},
      },
    },
  ]
}