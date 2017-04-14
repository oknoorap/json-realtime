const {existsSync, writeFileSync} = require('fs')

module.exports = filename => {
  if (!existsSync(filename)) {
    throw new Error('Invalid file.')
  }

  try {
    const jsonFile = require(filename)

    const saveFile = () => {
      writeFileSync(filename, JSON.stringify(jsonFile), 'utf-8')
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

      return new Proxy({}, validator)
    }

    return proxyWatcher(jsonFile)
  } catch (err) {
    throw new Error(err)
  }
}
