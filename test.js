import {readFile, writeFileSync, unlinkSync} from 'fs'
import test from 'ava'
import jsonRealtime from './index'

const exampleFile = './example/example.json'
const jsonFile = () => {
  return new Promise(resolve => {
    readFile(exampleFile, 'ascii', (err, data) => {
      if (err) {
        throw new Error(err)
      }
      resolve(data.toString())
    })
  })
}

writeFileSync(exampleFile, JSON.stringify({
  version: '1.0.0',
  greetings: [],
  object: {}
}))

const json = jsonRealtime(exampleFile)

test('example is object', t => {
  t.true(typeof json === 'object')
})

test('example.version is 1.0.0', t => {
  t.true(json.version === '1.0.0')
})

test('example.version should be changed', t => {
  json.version = '1.1.0'
  json.greetings = ['hello', 'world']
  json.object = {
    yo: true
  }
  t.pass()
})

test('example.version in file should be 1.1.0', async t => {
  await jsonFile().then(jsonStr => {
    const jsonObj = JSON.parse(jsonStr)
    t.true(json.version === jsonObj.version)
    t.true(jsonObj.version === '1.1.0')
  })
})

test('example.greetings is array', async t => {
  await jsonFile().then(jsonStr => {
    const jsonObj = JSON.parse(jsonStr)
    t.true(json.greetings[0] === jsonObj.greetings[0])
    t.true(json.greetings[1] === jsonObj.greetings[1])
    t.true(jsonObj.greetings[0] === 'hello')
    t.true(jsonObj.greetings[1] === 'world')
  })
})

test('example.object.yo is exists', async t => {
  await jsonFile().then(jsonStr => {
    const jsonObj = JSON.parse(jsonStr)
    t.true(json.object.yo === jsonObj.object.yo)
    t.true(typeof jsonObj === 'object')
    t.true(jsonObj.object.yo === true)
  })
})

// Delete `example.json` after test
test.after(() => {
  unlinkSync(exampleFile)
})
