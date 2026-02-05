// Test file for unused variables detection

// Unused imports
import { readFile } from 'node:fs/promises'
import type { Buffer } from 'node:buffer'

// Unused variable declarations
const unusedConst = 'never used'
let unusedLet = 42
var unusedVar = true

// Unused function
function unusedFunction() {
  return 'never called'
}

// Unused class
class UnusedClass {
  private value: number = 0
  getValue() {
    return this.value
  }
}

// Unused interface (types should not be flagged)
interface UnusedInterface {
  name: string
}

// Unused type alias (types should not be flagged)
type UnusedType = string | number

// Used variables
const usedConst = 'used'
let usedLet = 100

// Used function
function usedFunction(param: string) {
  // Unused parameter should be flagged
  const unusedInFunction = 'local unused'
  console.log(usedConst, usedLet)
}

usedFunction('test')
usedLet = 200
