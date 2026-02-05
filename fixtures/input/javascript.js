// JavaScript file with common JS linting scenarios
// Tests: antfu plugin, core JS rules, unused-imports

// ═══════════════════════════════════════════════════════════════════════════
// Top-level await (antfu/no-top-level-await)
// ═══════════════════════════════════════════════════════════════════════════
// Uncomment to test: await Promise.resolve() // Error: no top-level await

// ═══════════════════════════════════════════════════════════════════════════
// Object shorthand (object-shorthand)
// ═══════════════════════════════════════════════════════════════════════════
const name = 'John'
const age = 30
const person = {
  name: name,
  age: age,
  greet: function() {
    return 'Hello'
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Array callback return (array-callback-return)
// ═══════════════════════════════════════════════════════════════════════════
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(function(n) {
  return n * 2
})

// ═══════════════════════════════════════════════════════════════════════════
// Prefer const (prefer-const)
// ═══════════════════════════════════════════════════════════════════════════
let constantValue = 42
const mutableValue = constantValue + 1

// ═══════════════════════════════════════════════════════════════════════════
// No var (no-var)
// ═══════════════════════════════════════════════════════════════════════════
var oldStyleVar = 'should use const/let'

// ═══════════════════════════════════════════════════════════════════════════
// Prefer arrow callback (prefer-arrow-callback)
// ═══════════════════════════════════════════════════════════════════════════
const result = numbers.filter(function(n) {
  return n > 2
})

// ═══════════════════════════════════════════════════════════════════════════
// Prefer template literals (prefer-template)
// ═══════════════════════════════════════════════════════════════════════════
const greeting = 'Hello, ' + name + '!'

// ═══════════════════════════════════════════════════════════════════════════
// eqeqeq (smart equality)
// ═══════════════════════════════════════════════════════════════════════════
const value = '10'
const isEqual = value == 10
const isStrictEqual = value === '10'

// ═══════════════════════════════════════════════════════════════════════════
// No unneeded ternary (no-unneeded-ternary)
// ═══════════════════════════════════════════════════════════════════════════
const isActive = true
const status = isActive ? true : false

// ═══════════════════════════════════════════════════════════════════════════
// Prefer Object.hasOwn (prefer-object-has-own)
// ═══════════════════════════════════════════════════════════════════════════
const obj = { foo: 'bar' }
const hasFoo = obj.hasOwnProperty('foo')

// ═══════════════════════════════════════════════════════════════════════════
// Dot notation (dot-notation)
// ═══════════════════════════════════════════════════════════════════════════
const propValue = obj['foo']

// ═══════════════════════════════════════════════════════════════════════════
// Symbol description (symbol-description)
// ═══════════════════════════════════════════════════════════════════════════
const sym = Symbol()

// ═══════════════════════════════════════════════════════════════════════════
// Prefer exponentiation operator (prefer-exponentiation-operator)
// ═══════════════════════════════════════════════════════════════════════════
const squared = Math.pow(2, 3)

// ═══════════════════════════════════════════════════════════════════════════
// Usage to avoid unused warnings
// ═══════════════════════════════════════════════════════════════════════════
console.log(person, doubled, mutableValue, oldStyleVar, result, greeting)
console.log(isEqual, isStrictEqual, status, hasFoo, propValue, sym, squared)
