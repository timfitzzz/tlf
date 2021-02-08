const result = require('dotenv').config({ path: '.env'})
const { collect } = require('./collect')

console.log(result)

collect()
