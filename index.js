const {existsSync, readFileSync, writeFileSync} = require('fs')

module.exports = (filename, prettify = true, indent = 2) => {
  if (!existsSync(filename)) {
    throw new Error('Invalid file.')
  }

  try {
    const jsonFile = JSON.parse(readFileSync(filename, 'ascii'))

    const saveFile = () => {
      let jsonStr = JSON.stringify(jsonFile)

      if (prettify) {
        jsonStr = JSON.stringify(jsonFile, null, indent)
      }

      writeFileSync(filename, jsonStr, 'utf-8')
    }

    const proxyWatcher = object => {
      const validator = {
        get: (obj, key) => {
          let value = object[key]
          if (typeof value === 'object' && !Array.isArray(value)) {
            value = proxyWatcher(value)
          }
          return value
        },

        set: (obj, key, value) => {
          object[key] = value
          saveFile()
          return true
        }
      }

      return new Proxy(jsonFile, validator)
    }

    return proxyWatcher(jsonFile)
  } catch (err) {
    throw new Error(err)
  }
}
