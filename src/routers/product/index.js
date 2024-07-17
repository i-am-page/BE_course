'use strict'

const express = require('express')
const productController = require('../../controllers/product.controller')
const router = express.Router()
const { asyncHandler } = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')

//authentication
router.use(authentication)

//create product
router.post('/create', asyncHandler(productController.createProduct))   

module.exports = router
