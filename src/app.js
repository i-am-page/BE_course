require('dotenv').config()
const express = require('express')
const morgan = require('morgan') // use to tracking request
const helmet = require('helmet') // use to secure app by setting various HTTP headers
const compression = require('compression') // use to compress response due to heavy traffic payload
const app = express()

console.log('Process: ',process.env)
//init middlewares
app.use(morgan('dev'))   //dev
// morgan('combined') --apache standard -- product
// morgan('common') --apache standard -- 
// morgan('short') -- only response time
// morgan('tiny') -- method - link - status - time
app.use(helmet()) 
app.use(compression()) // change can be made upto 100 times

//init db
require('./dbs/init.mongodb')
 const { countConnect,checkOverload } = require('./helper/check.connect')
// countConnect()
// checkOverload()

//init routes
app.get('/', (req, res, next) => {
    // const str = "My name is Loc"
    return res.status(200).json({
        message: 'Hello World',
        // metadata: str.repeat(100000)
    })
}
)


//handle errors

module.exports = app