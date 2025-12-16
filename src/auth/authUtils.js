'use strict'

const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { head } = require('lodash')
const {
  findByUserId,
  revokeRefreshTokenByUserId
} = require('../models/repositories/keyToken.repo')
const { HEADER } = require('../utils/const')

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
