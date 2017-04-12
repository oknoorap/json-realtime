const {existsSync, writeFileSync} = require('fs')

module.exports = filename => {
  if (!existsSync(filename)) {
    throw new Error('Invalid file.')
  }

  try {
    const jsonFile = require(filename)
    const json = {}
    for (const key in jsonFile) {
      if (Object.prototype.hasOwnProperty.call(jsonFile, key)) {
        Object.defineProperty(json, key, {
          get: () => {
            return jsonFile[key]
          },

          set: value => {
            jsonFile[key] = value
            writeFileSync(filename, JSON.stringify(jsonFile), 'utf-8')
            return true
          }
        })
      }
    }

    return json
  } catch (err) {
    throw new Error(err)
  }
}
