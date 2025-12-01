'use strict'
const { CREATED } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
  signup = async (req, res, next) => {
    console.log('req.body', req.body)
    new CREATED({
      message: 'Register Ok',
      metadata: await AccessService.signUp({ ...req.body })
    }).send(res)
  }
}

module.exports = new AccessController()
