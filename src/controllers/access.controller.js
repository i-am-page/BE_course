'use strict'
const { OK, CREATED } = require("../core/success.response")
const accessService = require("../services/access.service")

class AccessController {
    handleRefreshToken = async (req, res, next) => {
        new OK({
            message: `Refresh Token OK`,
            metadata: await accessService.handleRefreshToken(req.body.refreshToken),
        }).send(res)
    }

    logIn = async (req, res, next) => {
        // return res.status(200).json(await accessService.logIn(req.body))
        new OK({
            message: `Login OK`,
            metadata: await accessService.logIn(req.body),
            options: { limit: 10 }
        }).send(res)
    }

    logOut = async (req, res, next) => {
        // return res.status(200).json(await accessService.logIn(req.body))
        // console.log(`[INFO]:: AccessController::logOut::req.keyStore`, req.keyStore)    
        new OK({
            message: `Logout OK`,
            metadata: await accessService.logOut(req.keyStore),
            options: { limit: 10 }
        }).send(res)
    }

    signUp = async (req, res, next) => {
        // return res.status(201).json(await accessService.signUp(req.body))
        new CREATED({
            message: `Registerd OK`,
            metadata: await accessService.signUp(req.body),
            options: { limit: 10 }
        }).send(res)
    }
}

module.exports = new AccessController()