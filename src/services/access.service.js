'use strict'
const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("node:crypto")
const { format } = require("path")
const { getInfoData } = require("../utils")
const KeyTokenService = require("./keyToken.service")
const { createTokenPair, verifyJWT } = require("../auth/authUtils")
const { BadRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response")
const { findByEmail } = require("./shop.service")

const RoleShop = {
    "SHOP": "SHOP",
    "ADMIN": "ADMIN",
    "WRITER": "WRITER",
    "EDITOR": "EDITOR",
}

class AccessService {
    handleRefreshToken = async (refreshToken) =>{
        //check token used
        const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken)
        if (foundToken) {
            //decode 
            const {userId,email} = await verifyJWT(refreshToken,foundToken.privateKey)
            console.log(`[INFO]:: FoundToken`,{userId,email})
            // delete all tokens in keyStore
            await KeyTokenService.deleteKeyById(userId)
            throw new ForbiddenError(`[ERROR]:: Something wrong!!!!`)
        }

        const holderToken = await KeyTokenService.findByRefreshToken(refreshToken)
        if(!holderToken){
            throw new AuthFailureError(`[ERROR]:: Shop not registered1`)
        }

        //verify token
        const {userId,email} = await verifyJWT(refreshToken,holderToken.privateKey)
        //check userId
        const foundShop = await findByEmail({email})
        console.log(`[INFO]:: FoundShop`,foundShop)
        if(!foundShop){
            throw new AuthFailureError(`[ERROR]:: Shop not registered2`)
        }

        //create new token pair
        const tokens = await createTokenPair({userId,email},holderToken.publicKey,holderToken.privateKey)
        //update token
        await holderToken.updateOne({
            $set:{
                refreshToken:tokens.refreshToken
            },
            $addToSet:{
                refreshTokensUsed:refreshToken
            }
        })
        // await holderToken.updateOne({
        //     $set:{
        //         refreshToken: tokens.refreshToken
        //     },
        //     $add:{
        //         refreshTokenUsed:refreshToken//token da dc su dung de lay token moi
        //     }
        // })
        return {
            user:{userId,email},
            tokens
        }
    }

    logOut = async( keyStore ) => {
        console.log(keyStore)
        const delKey = await KeyTokenService.removeKeyById(keyStore.userId)
        console.log({delKey})
        return delKey
    }

    logIn = async ({ email, password, refreshToken = null }) => {
        //check email in dbs
        //match pwd
        //create accessToken and refreshToken
        //generate tokens
        //get data return login success
        console.log(`[INFO]:: Start Login`)
        const foundShop = await findByEmail({ email })
        console.log(`[INFO]:: FoundShop`, foundShop)
        if (!foundShop) {
            throw new BadRequestError(`[ERROR]:: Shop not registered`)
        }
        const match = bcrypt.compare(password, foundShop.password)
        if (!match) {
            throw new AuthFailureError(`[ERROR]:: Password not match`)
        }

        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        const { _id: userId } = foundShop
        const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey, publicKey, userId
        })

        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email', 'roles'], object: foundShop }),
            tokens
        }

    }

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
                    shop: getInfoData({ fields: ['_id', 'name', 'email', 'roles'], object: newShop }),
                    tokens
                }
            }
        }
    }
}

module.exports = new AccessService()
