'use strict'
const express = require('express')
const asyncHandler = require('../helpers/asyncHandler')
const accessController = require('../controllers/access.controller')
const router = express.Router()

router.post('/', asyncHandler(accessController.signup))

module.exports = router
