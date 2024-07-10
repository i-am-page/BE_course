`use strict`

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000
//count Connect
const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of Connections: ${numConnection}`)
}

//check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss

        console.log(`Active Connections: ${numConnection}`)
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

        const maxConnection = numCores * 10
        if (numConnection > maxConnection) {
            console.log('Overload')
        }
    }, _SECONDS) //monitor every 5s

}

module.exports = { countConnect,checkOverload }