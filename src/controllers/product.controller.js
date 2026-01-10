'use strict'
const { CREATED } = require('../core/success.response')
const { createProduct } = require('../services/product.service')

class ProductController {
  createProduct = async (req, res, next) => {
    new CREATED({
      message: 'Create API Ok',
      metadata: await createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId
      })
    }).send(res)
  }
}

module.exports = new ProductController()
