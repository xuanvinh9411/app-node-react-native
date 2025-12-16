'use strict'
const express = require('express')
const router = express.Router()
const asyncHandler = require('../helpers/asyncHandler')
const accessController = require('../controllers/access.controller')
const { apiKey, permission } = require('../auth/checkAuth')
const { authentication } = require('../auth/authUtils')
router.post('/', asyncHandler(accessController.signup))
router.post('/login', asyncHandler(accessController.login))
router.post('/refresh-token', asyncHandler(accessController.refreshToken))
router.use(authentication)
// router.use(apiKey)
// router.use(permission('111'))
router.get('/test', (req, res) => {
  res.send('Test API KEY OK')
})

module.exports = router
