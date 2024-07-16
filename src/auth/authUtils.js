'use strict'

const JWT = require('jsonwebtoken')
const { asyncHandler } = require('../helper/asyncHandler')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { findByUserId } = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        //accessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            //algorithm:'RS256',
            expiresIn: '2 days'
        })
        const refreshToken = await JWT.sign(payload, privateKey, {
            //algorithm:'RS256',
            expiresIn: '7 days'
        })

        //

        JWT.verify(accessToken, publicKey, (err, decode) => {
            // console.log(`[P]::createTokenPair::verify::`, err, decodeURI)
            if (err) {
                console.error(`[Error]::createTokenPair::verify::`, err)
            } else {
                console.log(`[P]::createTokenPair::verify::`, decode)
            }
        })
        return { accessToken, refreshToken }
    } catch (error) {
        console.error(`[Error]::createTokenPair::`, error)
        return null
    }
}

const authentication = asyncHandler(async (req, res, next) => {
    //check userId missing
    //get accessToken
    //verify tokens
    //check user in dbs
    //check keyStore with this userId
    //return next
    
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) {
        throw new AuthFailureError(`[ERROR]:: Missing userId`)
    }

    const keyStore = await findByUserId(userId)
    if (!keyStore) {
        throw new NotFoundError(`[ERROR]:: KeyStore not found`)
    }
    // console.log(`[INFO]:: KeyStore`, keyStore)
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) {
        throw new AuthFailureError(`[ERROR]:: Missing accessToken`)
    }
    //console.log(`[INFO]:: accessToken`, accessToken)
    try {
        const decode = JWT.verify(accessToken, keyStore.publicKey)
        if (userId !== decode.userId) {
            throw new AuthFailureError(`[ERROR]:: Invalid accessToken`)
        }
        req.keyStore = keyStore
        // console.log(`[INFO]:: req.keyStore`, req.keyStore)
        return next()
    } catch (error) {
        // console.log(`[Error]::authentication::`, error)
        throw error
    }
})
const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret)
}


module.exports = { createTokenPair, authentication,verifyJWT }
