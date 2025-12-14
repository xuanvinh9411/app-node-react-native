const { createApiKey } = require('../models/repositories/apiKey.repo')

class ApiKeyService {
  static createApiKey = (body) => {
    return createApiKey(body)
  }
}

module.exports = ApiKeyService
