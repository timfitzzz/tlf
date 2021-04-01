const result = require('dotenv').config({ path: '.env'})
const { collect } = require('./collect')

collect()
