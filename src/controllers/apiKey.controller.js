'use strict'
const { CREATED } = require('../core/success.response')
const { createApiKey } = require('../services/apiKey.service')

class ApiKeyController {
  createApiKey = async (req, res, next) => {
    new CREATED({
      message: 'Create API Ok',
      metadata: await createApiKey({ ...req.body })
    }).send(res)
  }
}

module.exports = new ApiKeyController()
