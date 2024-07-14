'use strict'

const keyTokenModel = require("../models/keyToken.model")

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            //lv0
            // const tokens = await keyTokenModel.create({userId, publicKey, privateKey})
            // return tokens? tokens.publicKey: null

            //lv1
            const filter = { userId: userId },
                update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken },
                options = { upsert: true, new: true }//if not found create, if found update
            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)
            return tokens ? tokens.publicKey : null

        } catch (error) {
            console.log(`[Error]::KeyTokenService::createKeyToken`, error)
            return error
        }
    }
}

module.exports = KeyTokenService
