import test from 'ava'
import { readFileSync } from 'fs'
import jsonRealtime from 'index.js'

const exampleFile = './example/example.json'
const example = jsonRealtime(exampleFile)

test('example is object', t => {
  t.true(typeof lorem === 'object')
})

test('example.version is 1.0.0', t => {
  t.true(example.version === 1.0.0)
})

test('example.version shoulde be changed', t => {
  t.true(example.version = 1.1.0)
})

test('example.version is 1.1.0', t => {
  t.true(example.version === 1.1.0)
  const jsonstr = readFileSync(exampleFile, 'ascii')
  t.true(jsonstr === '{ "version": 1.1.0 }`)
})
