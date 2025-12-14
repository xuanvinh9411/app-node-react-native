'use strict'

const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { head } = require('lodash')
const {
  findByUserId,
  revokeRefreshTokenByUserId
} = require('../models/repositories/keyToken.repo')
const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESHTOKEN: 'x-rtoken-id'
}

const creaTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: '2 days'
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: '7 days'
    })

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`error verify::`, err)
      } else {
        console.log(`decode verify:: `, decode)
      }
    })
    return { accessToken, refreshToken }
  } catch (error) {
    console.log(error.message)
  }
}
const authentication = asyncHandler(async (req, res, next) => {
  /*
      1:: check user exist in db
      2:: get token from header
      3:: verify token
      4:: check userId fron token vs userId in db
      5:: attach user to req object return next()
      */
  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new Error('Invalid request!')

  const keyStore = await findByUserId(userId)
  if (!keyStore) throw new Error('Shop not registered!')

  // TODO refresh token nên renew mỗi lần sử dụng
  // check refresh token đã bị revoke chưa
  // nếu rồi thì logout user đó
  // renew refresh token cũng nên revoke khi logout
  // if (req.headers[HEADER.REFRESHTOKEN]) {
  //   try {
  //     const refreshToken = req.headers[HEADER.REFRESHTOKEN]
  //     const decodeUser = JWT.verify(refreshToken, keyStore.privateKey)
  //     if (userId !== decodeUser.userId)
  //       throw new Error('Invalid user token request!')
  //     // check refresh token có bị revoke chưa
  //     if (keyStore.refreshTokenUsed.includes(refreshToken))
  //       throw new Error('Refresh token revoked!')
  //     // revoke refresh token
  //     const newRefreshTokenUsed = keyStore.refreshTokenUsed.push(refreshToken)
  //     revokeRefreshTokenByUserId(userId, newRefreshTokenUsed)
  //     // renew refresh token
  //     const { refreshToken: newRefreshToken } = await creaTokenPair(
  //       {
  //         userId: decodeUser.userId
  //       },
  //       keyStore.publicKey,
  //       keyStore.privateKey
  //     )
  //     req.keyStore = keyStore
  //     req.user = decodeUser
  //     req.refreshToken = newRefreshToken
  //     return next()
  //   } catch (error) {
  //     throw new Error(error.message)
  //   }
  // }

  const token = await req.headers[HEADER.AUTHORIZATION]
  if (!token) throw new Error('Invalid request!')
  const accessToken = token.split(' ')[1]

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
    //accessToken còn hạn
    if (userId !== decodeUser.userId)
      throw new Error('Invalid user token request!')

    req.keyStore = keyStore
    req.user = decodeUser
    return next()
  } catch (error) {
    //accessToken hết hạn
    console.log(error)
    throw new Error(error.message)
  }
})

module.exports = {
  creaTokenPair,
  authentication
}
