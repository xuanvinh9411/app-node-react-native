'use strict'
const express = require('express')
const router = express.Router()

module.exports.init = (app) => {
  app.use('/v1/api/shop', require('./shop.router'))
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
}
