'use strict'
const shopModel = require("../models/shop.model")


const findByEmail = async ({ email, select = {
    email: 1, password: 1, name: 1, roles: 1, staus: 1
} }) => {
    return await shopModel.findOne({ email }).select(select).lean()
}
//select which fields to return

module.exports = { findByEmail }