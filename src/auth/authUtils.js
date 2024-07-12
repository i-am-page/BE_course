'use strict'

const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try{
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

        JWT.verify(accessToken,publicKey,(err,decode)=>{
            // console.log(`[P]::createTokenPair::verify::`, err, decodeURI)
            if(err){
                console.error(`[Error]::createTokenPair::verify::`, err)
            }else{
                console.log(`[P]::createTokenPair::verify::`, decode)
            }
        })
        return {accessToken, refreshToken}
    }catch(error){
        console.error(`[Error]::createTokenPair::`, error)
        return null
    }
}

module.exports = {createTokenPair}
