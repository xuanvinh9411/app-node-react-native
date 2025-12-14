'use strict'
const { CREATED } = require('../core/success.response')
const AccessService = require('../services/access.service')
const { HEADER } = require('../utils/const')

class AccessController {
  signup = async (req, res, next) => {
    new CREATED({
      message: 'Register Ok',
      metadata: await AccessService.signUp({ ...req.body })
    }).send(res)
  }

  login = async (req, res, next) => {
    new CREATED({
      message: 'Login Ok',
      metadata: await AccessService.login({ ...req.body })
    }).send(res)
  }

  refreshToken = async (req, res, next) => {
    new CREATED({
      message: 'RefreshToken Ok',
      metadata: await AccessService.refreshToken({
        userId: req.headers[HEADER.CLIENT_ID],
        refreshToken: req.headers[HEADER.REFRESHTOKEN]
      })
    }).send(res)
  }
}

module.exports = new AccessController()
