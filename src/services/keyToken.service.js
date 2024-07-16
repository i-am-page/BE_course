'use strict'

const { default: mongoose,Types } = require('mongoose')
const keyTokenModel = require("../models/keyToken.model")

class KeyTokenService {
    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshToken })
    }

    static deleteKeyById = async (userId) => {
        return await keyTokenModel.deleteOne({ userId: new Types.ObjectId(userId) })
    }

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

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ userId: new Types.ObjectId(userId) }).lean()
    }

    static removeKeyById = async(userId)=>{
        // console.log(`[INFO]:: Start error here`)
        return await keyTokenModel.deleteOne({userId:new Types.ObjectId(userId)})
    }


}

module.exports = KeyTokenService
