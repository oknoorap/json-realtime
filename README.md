# :pencil: JSON Realtime
Read and Write JSON in realtime.

# Install
Using NPM:  
`npm install json-realtime`

Using Yarn:  
`yarn add json-realtime`

# Usage
Example codes below is using ES6 with babel

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

// Return 'hello'
console.log(json.greetings)

/**
* Your current right now
* { "greetings": "hello" }
*/
```

# License
MIT (c) [https://github.com/oknoorap](oknoorap)
