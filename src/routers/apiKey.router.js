'use strict'
const express = require('express')
const ApiKeyController = require('../controllers/apiKey.controller')
const asyncHandler = require('../helpers/asyncHandler')
const router = express.Router()
router.post('/', asyncHandler(ApiKeyController.createApiKey))

module.exports = router
