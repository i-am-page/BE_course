require('dotenv').config()
const express = require('express')
const morgan = require('morgan') // use to tracking request
const helmet = require('helmet') // use to secure app by setting various HTTP headers
const compression = require('compression') // use to compress response due to heavy traffic payload
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//console.log('Process: ',process.env)
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
//const { countConnect,checkOverload } = require('./helper/check.connect')
// countConnect()
// checkOverload()

//init routes
app.use('/api',require('./routers/index'))
app.get('/',(req,res)=>{
    res.json({
        status:'success',
        code:200,
        message:'Welcome to the API'
    })
})    


//handle errors -- middleware
app.use((req,res,next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        status:'error',
        code:error.status,
        message: error.message || 'Internal Server Error'   
    })
}
)

module.exports = app