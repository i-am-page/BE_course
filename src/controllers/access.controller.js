'use strict'
const { OK, CREATED } = require("../core/success.response")
const accessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {
        // return res.status(201).json(await accessService.signUp(req.body))
        new CREATED({ 
            message: `Registerd OK`, 
            metadata: await accessService.signUp(req.body), 
            options:{limit:10}
        }).send(res)
    }
}

module.exports = new AccessController()