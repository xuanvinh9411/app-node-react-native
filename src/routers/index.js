'use strict'
const express = require('express')

module.exports.init = (app) => {
  app.use('/v1/api/apiKey', require('./apiKey.router'))
  app.use('/v1/api/shop', require('./shop.router'))
  app.use('/v1/api/product', require('./product.router'))
}
