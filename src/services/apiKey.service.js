'use strict'
const apiKeyModel = require("../models/apiKey.model")
const crypto = require("node:crypto")

const findById = async (key) => {
    // const newKey = await apiKeyModel.create({ key:crypto.randomBytes(64).toString('hex'),permissions:['0000'],status:true})
    // console.log(`newKey::`,newKey)
    const objKey = await apiKeyModel.findOne({ key, status: true }).lean()
    return objKey
}

module.exports = { findById }