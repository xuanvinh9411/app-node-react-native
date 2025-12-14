const keyTokenModel = require('../keytoken.model')

const findOneAndUpdateKeyToken = async (filter, update, options) => {
  return await keyTokenModel.findOneAndUpdate(filter, update, options)
}

const findByUserId = async (userId) => {
  return await keyTokenModel.findOne({ user: userId })
}

const revokeRefreshTokenByUserId = async (userId, refreshTokenUsed) => {
  return await keyTokenModel.findOneAndUpdate(
    { user: userId },
    { refreshTokenUsed: refreshTokenUsed }
  )
}
module.exports = {
  findOneAndUpdateKeyToken,
  findByUserId,
  revokeRefreshTokenByUserId
}
