'use strict'

const shopModel = require('../shop.model')

const findOneShopByEmail = async ({ email }) => {
  try {
    return await shopModel.findOne({ email }).lean()
  } catch (error) {
    console.log('error', error)
  }
}

const createShop = async ({ name, email, password }) => {
  return await shopModel.create({ name, email, password })
}
module.exports = {
  findOneShopByEmail,
  createShop
}
