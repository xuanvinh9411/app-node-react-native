'use strict'
const express = require('express')
const router = express.Router()
const asyncHandler = require('../helpers/asyncHandler')
const ProductController = require('../controllers/product.controller')
const { apiKey, permission } = require('../auth/checkAuth')
const { authentication } = require('../auth/authUtils')
router.use(authentication)
router.post('/', asyncHandler(ProductController.createProduct))
router.post('/:id', asyncHandler(ProductController.updateProduct))

module.exports = router
