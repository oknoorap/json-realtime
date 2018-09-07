# :pencil: JSON Realtime
Read and Write JSON in realtime. You don't need to open and write json file twice. It's just magic. It's support nested object too.

# Install
```bash
# npm
npm install json-realtime --save

# yarn
yarn add json-realtime
```

# Usage
```javascript
import jsonr from 'json-realtime'

/**
* Your current file is
* { "greetings": "yo" }
*/

const json = jsonr('./path/to/file.json')

// Return 'yo'
console.log(json.greetings)

// Set greetings
json.greetings = 'hello'

// Set non existing
json.mynumber = 10

// Return 'hello'
console.log(json.greetings)

/**
* Your current file right now
* { "greetings": "hello", "mynumber": 10 }
*/
```

# License
MIT © [oknoorap](https://github.com/oknoorap)
