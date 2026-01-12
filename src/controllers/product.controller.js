'use strict'
const { CREATED, SuccessResponse } = require('../core/success.response')
const { createProduct, updateProduct } = require('../services/product.service')

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

  updateProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Update Product Success',
      metadata: await updateProduct(req.body.product_type, req.params.id, {
        ...req.body,
        product_shop: req.user.userId
      })
    }).send(res)
  }
}

module.exports = new ProductController()
