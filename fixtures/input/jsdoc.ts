// JSDoc linting scenarios
// Tests: eslint-plugin-jsdoc rules

// ═══════════════════════════════════════════════════════════════════════════
// jsdoc/require-param - Require @param documentation
// ═══════════════════════════════════════════════════════════════════════════

// Missing @param documentation
function add(a: number, b: number): number {
  return a + b
}

// Correct JSDoc with params
/**
 * Multiplies two numbers.
 * @param a - First number
 * @param b - Second number
 * @returns The product
 */
function multiply(a: number, b: number): number {
  return a * b
}

// ═══════════════════════════════════════════════════════════════════════════
// jsdoc/check-param-names - Ensure param names match
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Divides two numbers.
 * @param numerator - The numerator
 * @param denominator - The denominator
 * @returns The quotient
 */
function divide(numerator: number, denominator: number): number {
  return numerator / denominator
}

// ═══════════════════════════════════════════════════════════════════════════
// jsdoc/require-returns-description - Require return description
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Subtracts two numbers.
 * @param a - First number
 * @param b - Second number
 * @returns
 */
function subtract(a: number, b: number): number {
  return a - b
}

// ═══════════════════════════════════════════════════════════════════════════
// jsdoc/check-types - Check types in JSDoc
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Gets user info.
 * @param id - User ID
 * @returns User data
 */
function getUser(id: string): { name: string; id: string } {
  return { name: 'User', id }
}

// ═══════════════════════════════════════════════════════════════════════════
// jsdoc/no-multi-asterisks - No unnecessary asterisks
// ═══════════════════════════════════════════════════════════════════════════

/**
 ** This has an extra asterisk that should be removed.
 * @param value - The value
 * @returns The value
 */
function identity<T>(value: T): T {
  return value
}

// ═══════════════════════════════════════════════════════════════════════════
// jsdoc/check-alignment - Check alignment of JSDoc
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Formats a name.
 *@param firstName - First name
 * @param lastName - Last name
 * @returns Full name
 */
function formatName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`
}

// ═══════════════════════════════════════════════════════════════════════════
// jsdoc/convert-to-jsdoc-comments - Convert regular comments to JSDoc
// ═══════════════════════════════════════════════════════════════════════════

// A greeting function that says hello
function greet(name: string): string {
  return `Hello, ${name}!`
}

// ═══════════════════════════════════════════════════════════════════════════
// jsdoc/implements-on-classes - Use @implements on classes
// ═══════════════════════════════════════════════════════════════════════════

interface Greeter {
  greet(): string
}

/**
 * A friendly greeter.
 */
class FriendlyGreeter implements Greeter {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  greet(): string {
    return `Hello, ${this.name}!`
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// jsdoc/require-property - Require @property on objects
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Configuration options.
 */
interface Config {
  host: string
  port: number
  debug?: boolean
}

/**
 * Creates a config.
 * @param options - Config options
 * @returns The config
 */
function createConfig(options: Partial<Config>): Config {
  return {
    host: options.host ?? 'localhost',
    port: options.port ?? 3000,
    debug: options.debug ?? false,
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Usage
// ═══════════════════════════════════════════════════════════════════════════
const sum = add(1, 2)
const product = multiply(3, 4)
const quotient = divide(10, 2)
const difference = subtract(5, 3)
const user = getUser('123')
const value = identity('test')
const fullName = formatName('John', 'Doe')
const message = greet('World')
const greeter = new FriendlyGreeter('Alice')
const config = createConfig({ host: 'example.com' })

console.log(sum, product, quotient, difference, user, value, fullName, message)
console.log(greeter.greet(), config)
