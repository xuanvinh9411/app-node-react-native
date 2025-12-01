const apiKeyModel = require('../apikey.model')

const findOneApiKey = async (key) => {
  return await apiKeyModel.findOne({ key, status: true })
}

module.exports = {
  findOneApiKey
}
