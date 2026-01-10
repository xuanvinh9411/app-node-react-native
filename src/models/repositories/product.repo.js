const { convertToObjectIdMongodb, unSelectData } = require('../../utils')
const { product } = require('../product.model')

const queryProduct = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

const findProductForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip })
}

const searchProductByUser = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch)
  const result = await product
    .find(
      {
        isPublic: true,
        $text: { $search: regexSearch }
      },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .lean()
  return result
}

const publishProductByShop = async ({ product_shop, product_id }) => {
  return await product
    .findOneAndUpdate(
      {
        _id: convertToObjectIdMongodb(product_id),
        product_shop: convertToObjectIdMongodb(product_shop)
      },
      {
        isPushlished: true,
        isDraft: false
      },
      { new: true }
    )
    .lean()
}

const unPublishProductByShop = async ({ product_shop, product_id }) => {
  return await product
    .findOneAndUpdate(
      {
        _id: convertToObjectIdMongodb(product_id),
        product_shop: convertToObjectIdMongodb(product_shop)
      },
      {
        isPushlished: false,
        isDraft: true
      },
      { new: true }
    )
    .lean()
}

const findAllProducts = async ({ filter, select, limit, sort, page }) => {
  const skip = (page - 1) * limit
  return await product
    .find(filter)
    .select(select)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean()
}

const findProduct = async ({ product_id, unSelect }) => {
  return await products
    .findById(product_id)
    .select(unSelectData(unSelect))
    .lean()
}

const getProductById = async ({ product_id }) => {
  return await product.findById(product_id).lean()
}
module.exports = {
  queryProduct,
  findProductForShop,
  searchProductByUser,
  publishProductByShop,
  unPublishProductByShop,
  findAllProducts,
  findProduct,
  getProductById
}
