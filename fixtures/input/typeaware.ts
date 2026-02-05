// TypeScript Type-Aware linting scenarios
// Tests: @typescript-eslint rules that require type information
// These rules only work when typeAware: true is enabled

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/await-thenable - Only await thenables
// ═══════════════════════════════════════════════════════════════════════════
async function awaitNonThenable() {
  const value = 42
  // This should error with typeAware - awaiting non-thenable
  const result = await value
  return result
}

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/no-floating-promises - Handle promises
// ═══════════════════════════════════════════════════════════════════════════
async function fetchData(): Promise<string> {
  return 'data'
}

function callWithoutAwait() {
  // This should error with typeAware - floating promise
  fetchData()
}

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/no-for-in-array - Don't use for-in on arrays
// ═══════════════════════════════════════════════════════════════════════════
function iterateArray(arr: string[]) {
  // This should error with typeAware - for-in on array
  for (const i in arr) {
    console.log(arr[i])
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/no-misused-promises - Don't misuse promises
// ═══════════════════════════════════════════════════════════════════════════
async function asyncHandler(): Promise<void> {
  console.log('handling')
}

// This should error with typeAware - promise in boolean context
function checkPromise() {
  if (asyncHandler()) {
    console.log('done')
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/no-unnecessary-type-assertion - Remove unnecessary assertions
// ═══════════════════════════════════════════════════════════════════════════
function unnecessaryAssertion(value: string) {
  // This should error with typeAware - unnecessary assertion
  return value as string
}

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/restrict-plus-operands - Type-safe string concatenation
// ═══════════════════════════════════════════════════════════════════════════
function addValues(a: string, b: number) {
  // This should error with typeAware - mismatched operands
  return a + b
}

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/restrict-template-expressions - Type-safe template literals
// ═══════════════════════════════════════════════════════════════════════════
function templateWithObject(obj: { name: string }) {
  // This should error with typeAware - object in template
  return `Value: ${obj}`
}

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/switch-exhaustiveness-check - Exhaustive switch
// ═══════════════════════════════════════════════════════════════════════════
type Status = 'pending' | 'approved' | 'rejected'

function handleStatus(status: Status): string {
  // This should error with typeAware - non-exhaustive switch
  switch (status) {
    case 'pending':
      return 'Waiting...'
    case 'approved':
      return 'Done!'
    // Missing 'rejected' case
  }
  return 'unknown'
}

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/promise-function-async - Async functions returning promises
// ═══════════════════════════════════════════════════════════════════════════
function returnsPromise(): Promise<string> {
  return Promise.resolve('value')
}

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/return-await - Proper return await in try-catch
// ═══════════════════════════════════════════════════════════════════════════
async function properReturnAwait(): Promise<string> {
  try {
    // In try-catch, should use return await
    return fetchData()
  }
  catch (e) {
    console.error(e)
    return 'error'
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// @typescript-eslint/unbound-method - Don't pass unbound methods
// ═══════════════════════════════════════════════════════════════════════════
class Logger {
  prefix = '[LOG]'

  log(message: string) {
    console.log(`${this.prefix} ${message}`)
  }
}

function useUnboundMethod() {
  const logger = new Logger()
  // This should error with typeAware - unbound method
  const logFn = logger.log
  return logFn
}

// ═══════════════════════════════════════════════════════════════════════════
// Usage to avoid unused warnings
// ═══════════════════════════════════════════════════════════════════════════
export {
  awaitNonThenable,
  callWithoutAwait,
  iterateArray,
  checkPromise,
  unnecessaryAssertion,
  addValues,
  templateWithObject,
  handleStatus,
  returnsPromise,
  properReturnAwait,
  useUnboundMethod,
}
