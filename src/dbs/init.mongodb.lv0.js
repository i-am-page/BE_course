`use strict`

const mongoose = require('mongoose')


const connectString = 'mongodb://localhost:27017/locdb'
mongoose.connect(connectString).then(() => console.log('MongoDB connected v0'))
.catch((err) => console.log(err))


//dev
if (1===1) {
    mongoose.set('debug', true)
    mongoose.set('debug', {color: true})    
}

module.exports = mongoose