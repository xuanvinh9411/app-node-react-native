const { creaTokenPair } = require('../auth/authUtils')
const bcrypt = require('bcrypt')
const { findByUserId } = require('../models/repositories/keyToken.repo')
const {
  findOneShopByEmail,
  createShop
} = require('../models/repositories/shop.repo')
const {
  revokeRefreshTokenByUserId
} = require('../models/repositories/keyToken.repo')
const { getIntoData } = require('../utils')
const KeyTokenService = require('./keytoken.service')
const crypto = require('crypto')
const JWT = require('jsonwebtoken')

class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    try {
      /* Check if shop exist */
      // compare password
      // create privatekey , publickey
      // insert or update  privatekey , publickey keytonken collection keytokenModel
      // create acctoken , refreshtoken
      // return
      const holderShop = await findOneShopByEmail({ email })
      if (!holderShop) throw new Error('Error: Shop not register')

      const match = await bcrypt.compare(password, holderShop.password)
      if (!match) throw new Error('Error: Password incorrect')

      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')

      const token = await creaTokenPair(
        { userId: holderShop._id, email },
        publicKey,
        privateKey
      )

      const keyStore = await KeyTokenService.createkeyToken({
        userId: holderShop._id,
        privateKey,
        publicKey,
        refreshToken: token.refreshToken
      })
      if (!keyStore) throw new Error('Not found  keytoken !')

      return {
        code: 200,
        metadata: {
          shop: getIntoData({
            fields: ['_id', 'name', 'email'],
            object: holderShop
          }),
          token: token
        }
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

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

  static refreshToken = async ({ userId, refreshToken }) => {
    const keyStore = await findByUserId(userId)
    if (!keyStore) throw new Error('Shop not registered!')
    // TODO refresh token nên renew mỗi lần sử dụng
    // check refresh token đã bị revoke chưa
    // nếu rồi thì logout user đó
    // renew refresh token cũng nên revoke khi logout
    if (refreshToken) {
      try {
        const decodeUser = JWT.verify(refreshToken, keyStore.privateKey)
        if (userId !== decodeUser.userId)
          throw new Error('Invalid user token request!')
        // check refresh token có bị revoke chưa
        if (keyStore.refreshTokenUsed.includes(refreshToken))
          throw new Error('Refresh token revoked!')
        // revoke refresh token
        const newRefreshTokenUsed = keyStore.refreshTokenUsed.push(refreshToken)
        console.log(`newRefreshTokenUsed :${newRefreshTokenUsed}`)
        await revokeRefreshTokenByUserId(userId, keyStore.refreshTokenUsed)
        // renew refresh token
        const token = await creaTokenPair(
          {
            userId: decodeUser.userId
          },
          keyStore.publicKey,
          keyStore.privateKey
        )
        return {
          code: 200,
          metadata: {
            token: token
          }
        }
      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
}

module.exports = AccessService
