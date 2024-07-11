'use strict'
const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")


const RoleShop = {
    "SHOP": "SHOP",
    "ADMIN": "ADMIN",
    "WRITER": "WRITER",
    "EDITOR": "EDITOR",
}

class AccessService {
    signUp = async ({ name, email, password }) => {
        try {
            console.log(`AccessServices`)
            //step1: check if the email is already registered
            const shopHolder = await shopModel.findOne({ email }).lean()
            if (shopHolder) {
                return {
                    code: `40001`,
                    message: `Email already exists`,
                }
            }
            //step2: create a new shop
            const hashedPassword = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({ name, email, password: hashedPassword, roles: [RoleShop.SHOP] })
            
            if(newShop){
                //create private, public key
                const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                })
                console.log(`[P]::PrivateKey::`, privateKey)
                console.log(`[P]::PublicKey::`, publicKey) // save collection KeyStore
            }
        }
        catch (error) {
            console.log(`error`, error)
            return res.status(500).json({
                code: `50001`,
                message: error.message,
                status: 'error'
            })
        }
    }
}

module.exports = new AccessService()
