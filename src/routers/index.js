'use strict'
const express = require('express')
const router = express.Router()
const accessRouter = require('./access')



router.use('/v1', accessRouter)

module.exports = router