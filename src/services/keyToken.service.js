'use strict'

const keyTokenModel = require("../models/keyToken.model")

class KeyTokenService{
    static createKeyToken = async ({userId, publicKey,privateKey}) => {
        try{
            const tokens = await keyTokenModel.create({userId, publicKey, privateKey})
            return tokens? tokens.publicKey: null
        } catch (error) {
            console.log(`[Error]::KeyTokenService::createKeyToken`, error)
            return error
        }
    }
}

module.exports = KeyTokenService
