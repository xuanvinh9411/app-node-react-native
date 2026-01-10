'use strict'

const {
  product,
  clothing,
  electronic,
  funiture
} = require('../models/product.model')
const {
  findAllDraftsForShop,
  publishProductByShop,
  findAllPublishForShop,
  unPublishProductByShop,
  searchproductByUser,
  findAllProduct,
  findProduct,
  updateProductById
} = require('../models/repositories/product.repo')
const { convertToObjectIdMongodb } = require('../utils')

class ProductService {
  static productRegistry = {}

  static registerProductType = (type, classRef) => {
    console.log(`classRef`, classRef)
    ProductService.productRegistry[type] = classRef
  }

  static async createProduct(type, payload) {
    const productClass = ProductService.productRegistry[type]
    console.log('productClass', productClass)
    if (!productClass) throw new Error('Invalid product type')
    const product = new productClass(payload)
    return await product.createProduct()
  }
}

class Product {
  constructor({
    product_name: product_name,
    product_thumb: product_thumb,
    product_description: product_description,
    product_price: product_price,
    product_quantity: product_quantity,
    product_type: product_type,
    product_shop: product_shop,
    product_attributes: product_attributes
  }) {
    this.product_name = product_name
    this.product_thumb = product_thumb
    this.product_description = product_description
    this.product_price = product_price
    this.product_quantity = product_quantity
    this.product_type = product_type
    this.product_shop = product_shop
    this.product_attributes = product_attributes
  }

  async createProduct(product_Id) {
    const newProduct = await product.create({ ...this, _id: product_Id })
    return newProduct
    // add Inventory
    // push Notification
  }
}

class ClothingProduct extends Product {
  async createProduct() {
    const newClothingProduct = await clothing.create({
      ...this.product_attributes,
      product_shop: convertToObjectIdMongodb(this.product_shop)
    })
    if (!newClothingProduct) throw new Error('Create clothing product error')
    const newProduct = await super.createProduct(newClothingProduct._id)
    if (!newProduct) throw new Error('Create product error')
    return newProduct
  }
}

class ElectronicProduct extends Product {
  async createProduct() {
    const newElectronicProduct = await electronic.create({
      ...this.product_attributes,
      product_shop: convertToObjectIdMongodb(this.product_shop)
    })
    if (!newElectronicProduct)
      throw new Error('Create electronic product error')
    const newProduct = await super.createProduct(newElectronicProduct._id)
    if (!newProduct) throw new Error('Create product error')
    return newProduct
  }
}

class FurnitureProduct extends Product {
  async createProduct() {
    const newFurnitureProduct = await funiture.create({
      ...this.product_attributes,
      product_shop: convertToObjectIdMongodb(this.product_shop)
    })
    if (!newFurnitureProduct) throw new Error('Create furniture product error')
    const newProduct = await super.createProduct(newFurnitureProduct._id)
    if (!newProduct) throw new Error('Create product error')
    return newProduct
  }
}

ProductService.registerProductType('Clothing', ClothingProduct)
ProductService.registerProductType('Electronics', ElectronicProduct)
ProductService.registerProductType('Furniture', FurnitureProduct)
module.exports = ProductService
