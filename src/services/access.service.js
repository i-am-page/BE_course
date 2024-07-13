'use strict'
const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("node:crypto")
const { format } = require("path")
const { getInfoData } = require("../utils")
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { BadRequestError } = require("../core/error.response")

const RoleShop = {
    "SHOP": "SHOP",
    "ADMIN": "ADMIN",
    "WRITER": "WRITER",
    "EDITOR": "EDITOR",
}

class AccessService {
    signUp = async ({ name, email, password }) => {
        // try {
            //step1: check if the email is already registered
            const shopHolder = await shopModel.findOne({ email }).lean()
            if (shopHolder) {
                throw new BadRequestError(`[ERROR]:: Email already exists`)
            }
            //step2: create a new shop
            const hashedPassword = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({ name, email, password: hashedPassword, roles: [RoleShop.SHOP] })

            if (newShop) {
                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')
                //console.log({ publicKey, privateKey }) // save collection KeyStore

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if (!keyStore) {
                    throw new BadRequestError(`[ERROR]:: KeyStore not created`)
                }  

                //create token pair

                const tokens = await createTokenPair({ userId: newShop._id }, publicKey, privateKey)
                console.log(`Created token Success::`, tokens)

                return {
                    code: `201`,
                    metadata: {
                        shop: getInfoData({fields: ['_id', 'name', 'email', 'roles'], object: newShop}),
                        tokens
                    }
                }
            }
        // }
        // catch (error) {
        //     console.log(`error`, error)
        //     return res.status(500).json({
        //         code: `50001`,
        //         message: error.message,
        //         status: 'error'
        //     })
        // }
    }
}

module.exports = new AccessService()
