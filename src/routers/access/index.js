'use strict'

const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../auth/checkAuth')

//signup

router.post('/shop/signup', asyncHandler(accessController.signUp))
router.post('/shop/login', asyncHandler(accessController.logIn))


module.exports = router