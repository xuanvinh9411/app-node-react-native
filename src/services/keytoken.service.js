const {
  findOneAndUpdateKeyToken
} = require('../models/repositories/keyToken.repo')

class KeyTokenService {
  static createkeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken
  }) => {
    const filter = { user: userId },
      update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken },
      options = { upsert: true, new: true }
    const token = await findOneAndUpdateKeyToken(filter, update, options)
    return token ? token.publicKey : null
  }
}

module.exports = KeyTokenService
