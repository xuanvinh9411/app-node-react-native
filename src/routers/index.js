'use strict'
const express = require('express')
const router = express.Router()

module.exports.init = (app) => {
  app.use('/v1/api/apiKey', require('./apiKey.router'))
  app.use('/v1/api/shop', require('./shop.router'))
}
