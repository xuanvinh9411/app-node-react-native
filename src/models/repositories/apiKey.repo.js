const apiKeyModel = require('../apikey.model')

const findOneApiKey = async (key) => {
  return await apiKeyModel.findOne({ key, status: true })
}

const createApiKey = async (body) => {
  return await apiKeyModel.create({ ...body })
}

module.exports = {
  findOneApiKey,
  createApiKey
}
