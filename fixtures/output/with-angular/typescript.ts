// TypeScript file with common linting scenarios

// ═══════════════════════════════════════════════════════════════════════════
// Import sorting and type imports
// ═══════════════════════════════════════════════════════════════════════════
import { readFile } from 'node:fs/promises'
import type { Buffer } from 'node:buffer'
import path from 'node:path'
import type { Stats } from 'node:fs'

// ═══════════════════════════════════════════════════════════════════════════
// Interface and type definitions
// ═══════════════════════════════════════════════════════════════════════════
interface Person {
  name: string
  age: number
}

interface Car {
  make: string
  model?: string
}

type Fruit = 'apple' | 'banana' | 'orange'

// ═══════════════════════════════════════════════════════════════════════════
// Unused variables (should be caught)
// ═══════════════════════════════════════════════════════════════════════════
const unusedVar = 'this should be flagged'
const usedVar = 'this is used'

// ═══════════════════════════════════════════════════════════════════════════
// Stylistic issues
// ═══════════════════════════════════════════════════════════════════════════
const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
]

// eslint-disable-next-line no-console
const log = console.log

// Use var (should suggest let/const)
const mutableValue = 42

// Generic function with spacing issues
function identity<T>(arg: T): T {
  return arg
}

// Arrow function
function greet(name: string): string {
  return `Hello, ${name}!`
}

// Class with proper TypeScript patterns
class Animal {
  private name: string
  constructor(name: string) {
    this.name = name
  }

  protected makeSound(sound: string) {
    log(`${this.name} says ${sound}`)
  }
}

class Dog extends Animal {
  constructor(alias: string) {
    super(alias)
  }

  bark() {
    this.makeSound('Woof!')
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Async/await patterns
// ═══════════════════════════════════════════════════════════════════════════
async function loadData(): Promise<string> {
  const content = await readFile('test.txt', 'utf-8')
  return content
}

// ═══════════════════════════════════════════════════════════════════════════
// Generator functions
// ═══════════════════════════════════════════════════════════════════════════
export function * generator1() {
  let id = 0
  while (id < 100) {
    yield id++
  }
}

export function * generator2() {
  yield* generator1()
}

// ═══════════════════════════════════════════════════════════════════════════
// Usage to avoid unused warnings for demo purposes
// ═══════════════════════════════════════════════════════════════════════════
const dog = new Dog('Buddy')
dog.bark()

const result = identity<string>('TypeScript')
log(result, usedVar, people, mutableValue, greet('World'))

const favoriteFruit: Fruit = 'apple'
const car: Car = { make: 'Toyota' }
log(favoriteFruit, car)

export { loadData, path, type Buffer, type Stats }
