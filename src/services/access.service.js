const { creaTokenPair } = require('../auth/authUtils')
const bcrypt = require('bcrypt')
const {
  findOneAndUpdateKeyToken
} = require('../models/repositories/keyToken.repo')
const {
  findOneShopByEmail,
  createShop
} = require('../models/repositories/shop.repo')
const { getIntoData } = require('../utils')
const KeyTokenService = require('./keytoken.service')
const crypto = require('crypto')
class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const holderShop = await findOneShopByEmail({ email })
      if (holderShop) throw new Error('Error: Shop Already register')

      const passwordHash = await bcrypt.hash(password, 10)
      const newShop = await createShop({ name, email, password: passwordHash })
      if (!newShop) throw new Error('Error: Shop register fail! ')

      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')

      const userId = newShop._id
      const keyStore = await KeyTokenService.createkeyToken({
        userId,
        privateKey,
        publicKey
      })
      if (!keyStore) throw new Error('Not found  keytoken !')
      const token = await creaTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      )
      return {
        code: 201,
        metadata: {
          shop: getIntoData({
            fields: ['_id', 'name', 'email'],
            object: newShop
          }),
          token: token
        }
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = AccessService
