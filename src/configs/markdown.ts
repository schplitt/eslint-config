import type { Config } from '../types'
import { MARKDOWN_GLOB, MARKDOWN_CODE_GLOB, MARKDOWN_IN_MARKDOWN_GLOB } from '../globs'
import { interopDefault } from '../utils'
import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors'

/**
 * Markdown linting for code blocks and markdown style
 */
export async function markdownPreset(): Promise<Config[]> {
  const [
    markdown,
    markdownPreferences,
  ] = await Promise.all([
    interopDefault(import('@eslint/markdown')),
    interopDefault(import('eslint-plugin-markdown-preferences')),
  ])

  return [
    {
      name: 'schplitt/eslint-config:markdown/setup',
      plugins: {
        markdown,
        'markdown-preferences': markdownPreferences,
      },
    },
    {
      name: 'schplitt/eslint-config:markdown/processor',
      files: [MARKDOWN_GLOB],
      ignores: [MARKDOWN_IN_MARKDOWN_GLOB],
      // `@eslint/markdown` only creates virtual files for code blocks,
      // but not the markdown file itself. We use `eslint-merge-processors` to
      // add a pass-through processor for the markdown file itself.
      processor: mergeProcessors([
        markdown.processors!.markdown,
        processorPassThrough,
      ]),
    },
    {
      name: 'schplitt/eslint-config:markdown/rules',
      files: [MARKDOWN_GLOB],
      ignores: [MARKDOWN_IN_MARKDOWN_GLOB],
      language: 'markdown/gfm',
      languageOptions: {
        frontmatter: 'yaml',
      },
      rules: {
        // Preference Rules
        'markdown-preferences/canonical-code-block-language': 'error',
        'markdown-preferences/emoji-notation': 'error',
        // header casing removed as it would collide with every package name in a title
        'markdown-preferences/no-heading-trailing-punctuation': 'error',
        'markdown-preferences/ordered-list-marker-start': 'error',
        'markdown-preferences/table-header-casing': 'error',

        // Notation Rules
        'markdown-preferences/bullet-list-marker-style': 'error',
        'markdown-preferences/code-fence-style': 'error',
        'markdown-preferences/emphasis-delimiters-style': 'error',
        'markdown-preferences/hard-linebreak-style': 'error',
        'markdown-preferences/level1-heading-style': 'error',
        'markdown-preferences/level2-heading-style': 'error',
        'markdown-preferences/link-destination-style': 'error',
        'markdown-preferences/link-title-style': 'error',
        'markdown-preferences/no-implicit-block-closing': 'error',
        'markdown-preferences/no-text-backslash-linebreak': 'error',
        'markdown-preferences/ordered-list-marker-style': 'error',
        'markdown-preferences/prefer-autolinks': 'error',
        'markdown-preferences/prefer-fenced-code-blocks': 'error',
        'markdown-preferences/strikethrough-delimiters-style': 'error',
        'markdown-preferences/thematic-break-character-style': 'error',

        // Whitespace Rules
        'markdown-preferences/blockquote-marker-alignment': 'error',
        'markdown-preferences/code-fence-spacing': 'error',
        'markdown-preferences/custom-container-marker-spacing': 'error',
        'markdown-preferences/indent': 'error',
        'markdown-preferences/link-bracket-newline': 'error',
        'markdown-preferences/link-bracket-spacing': 'error',
        'markdown-preferences/link-paren-newline': 'error',
        'markdown-preferences/link-paren-spacing': 'error',
        'markdown-preferences/list-marker-alignment': 'error',
        'markdown-preferences/no-multi-spaces': 'error',
        'markdown-preferences/no-multiple-empty-lines': 'error',
        'markdown-preferences/no-tabs': 'error',
        'markdown-preferences/no-trailing-spaces': 'error',
        'markdown-preferences/padded-custom-containers': 'error',
        'markdown-preferences/padding-line-between-blocks': 'error',
        'markdown-preferences/table-pipe-spacing': 'error',

        // Decorative Rules
        'markdown-preferences/atx-heading-closing-sequence-length': 'error',
        'markdown-preferences/atx-heading-closing-sequence': 'error',
        'markdown-preferences/code-fence-length': 'error',
        'markdown-preferences/no-laziness-blockquotes': 'error',
        'markdown-preferences/ordered-list-marker-sequence': 'error',
        'markdown-preferences/setext-heading-underline-length': 'error',
        'markdown-preferences/sort-definitions': 'error',
        'markdown-preferences/table-leading-trailing-pipes': 'error',
        'markdown-preferences/table-pipe-alignment': 'error',
        'markdown-preferences/thematic-break-length': 'error',
        'markdown-preferences/thematic-break-sequence-pattern': 'error',
      },
    },
    {
      name: 'schplitt/eslint-config:markdown/disables',
      files: [MARKDOWN_CODE_GLOB],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      rules: {
        // Disable rules that don't make sense in code examples
        'no-alert': 'off',
        'no-console': 'off',
        'no-labels': 'off',
        'no-lone-blocks': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-labels': 'off',
        'no-unused-vars': 'off',

        // Node
        'node/prefer-global/process': 'off',

        // Stylistic
        'style/comma-dangle': 'off',
        'style/eol-last': 'off',
        'style/padding-line-between-statements': 'off',
        'style/indent': 'off',

        // TypeScript
        'ts/consistent-type-imports': 'off',
        'ts/explicit-function-return-type': 'off',
        'ts/no-namespace': 'off',
        'ts/no-redeclare': 'off',
        'ts/no-require-imports': 'off',
        'ts/no-unused-expressions': 'off',
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': 'off',

        // Imports
        'unicode-bom': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
  ]
}
