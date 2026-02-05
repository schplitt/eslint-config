// Node.js specific linting scenarios
// Tests: eslint-plugin-n (node) rules

import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ═══════════════════════════════════════════════════════════════════════════
// node/no-path-concat - Use path.join instead of string concat
// ═══════════════════════════════════════════════════════════════════════════
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// This should trigger node/no-path-concat
const badPath = `${__dirname}/file.txt`

// This is the correct way
const goodPath = path.join(__dirname, 'file.txt')

// ═══════════════════════════════════════════════════════════════════════════
// node/prefer-global/buffer - Use import, not global Buffer
// ═══════════════════════════════════════════════════════════════════════════
// Global Buffer usage (should suggest importing)
const buf = Buffer.from('hello')

// ═══════════════════════════════════════════════════════════════════════════
// node/prefer-global/process - Use import, not global process
// ═══════════════════════════════════════════════════════════════════════════
// Global process usage (should suggest importing)
const nodeEnv = process.env.NODE_ENV

// ═══════════════════════════════════════════════════════════════════════════
// node/handle-callback-err - Handle error in callbacks
// ═══════════════════════════════════════════════════════════════════════════
function handleFile(err: Error | null, data: string) {
  // Should handle error
  console.log(data)
}

// Proper error handling
function handleFileCorrect(err: Error | null, data: string) {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
}

// ═══════════════════════════════════════════════════════════════════════════
// node/no-new-require - No using new with require
// ═══════════════════════════════════════════════════════════════════════════
// This pattern is deprecated - using imports instead is preferred

// ═══════════════════════════════════════════════════════════════════════════
// node/no-exports-assign - Don't assign to exports
// ═══════════════════════════════════════════════════════════════════════════
// This is for CommonJS, modern ESM uses export instead

// ═══════════════════════════════════════════════════════════════════════════
// node/process-exit-as-throw - Treat process.exit as throw
// ═══════════════════════════════════════════════════════════════════════════
function terminate(): never {
  process.exit(1)
}

// ═══════════════════════════════════════════════════════════════════════════
// Usage
// ═══════════════════════════════════════════════════════════════════════════
export { badPath, goodPath, buf, nodeEnv, handleFile, handleFileCorrect, terminate }
