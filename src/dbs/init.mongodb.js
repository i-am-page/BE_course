`use strict`

const mongoose = require('mongoose')
const { countConnect } = require('../helper/check.connect')
const {db:{host,port,name}} = require('../configs/config.mongodb.lv1')
const connectString = `mongodb://${host}:${port}/${name}`
console.log('Connect String: ',connectString)
class Database{
    constructor(){
        this.connect()
    }

    //connect
    connect(type = 'mongodb'){
        if (1===1) {
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})    
        }
        mongoose.connect(connectString,{
            maxPoolSize: 10,
        }).then(() => {console.log('MongoDB connected Pro');countConnect()})
        .catch((err) => console.log(err))

    }

    static getInstance(){
        if (!Database.instance){
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongoDB = Database.getInstance()
module.exports = instanceMongoDB    
