const keyTokenModel = require('../keytoken.model')

const findOneAndUpdateKeyToken = async (filter, update, options) => {
  return await keyTokenModel.findOneAndUpdate(filter, update, options)
}

module.exports = {
  findOneAndUpdateKeyToken
}
