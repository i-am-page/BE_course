'use strict'

const { findById } = require("../services/apiKey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {

    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        //console.log(key)
        if (!key) {
            return res.status(403).json({ message: `Forbiddn Error1` })
        }

        //check objKey
        const objKey = await findById(key)
        if (!objKey) {
            return res.status(403).json({ message: `Forbiddn Error2` })
        }

        req.objKey = objKey
        return next()

    } catch (error) {
        console.error(`ERROR::`, error)
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({ message: `Permission Denied1` })
        }
        console.log(`permission::`, req.objKey.permissions)
        const valid = req.objKey.permissions.includes(permission)
        if (!valid) {
            return res.status(403).json({ message: `Permission Denied2` })
        }
        return next()
    }
}

module.exports = { apiKey, permission }