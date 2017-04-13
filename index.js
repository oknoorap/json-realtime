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

    const watcher = object => {
      const json = {}
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          Object.defineProperty(json, key, {
            get: () => {
              let value = object[key]
              if (typeof value === 'object' && !Array.isArray(value)) {
                value = watcher(value)
              }
              return value
            },

            set: value => {
              object[key] = value
              saveFile()
            }
          })
        }
      }
      return json
    }

    return watcher(jsonFile)
  } catch (err) {
    throw new Error(err)
  }
}
