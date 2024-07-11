'use strict'
const accessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::SignUp::`, req.body)
            const data = await accessService.signUp(req.body)
            return res.status(201).json(
                data
            )
        }
        catch (error) {
            return res.status(501).json({
                message: error.message
            })
        }
    }
}

module.exports = new AccessController()