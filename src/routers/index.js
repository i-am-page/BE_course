'use strict'
const express = require('express')
const router = express.Router()
const accessRouter = require('./access')
const productRouter = require('./product')
const { apiKey, permission } = require('../auth/checkAuth')

//check apiKey
router.use(apiKey)
//check permission
router.use(permission('0000'))


router.use('/v1', accessRouter)
router.use('/v1/product', productRouter)

module.exports = router