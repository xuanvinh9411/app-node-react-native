'use strict'

const DEV = {
  app: {
    port: process.env.PORT || 3055
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || '27017',
    name: process.env.DEV_DB_NAME || 'ecommerce',
    user: process.env.DEV_DB_USER || 'root',
    password: process.env.DEV_DB_PASSWORD || 'admin@123'
  }
}
const PROD = {
  app: {
    port: process.env.PORT || 3000
  },
  db: {
    host: process.env.PROD_DB_HOST || 'localhost',
    port: process.env.PROD_DB_PORT || '27017',
    name: process.env.PROD_DB_NAME || 'ecommerce',
    user: process.env.PROD_DB_USER || 'root',
    password: process.env.PROD_DB_PASSWORD || 'admin@123'
  }
}

//TODO
const connectOptions = {}

const config = {
  dev: DEV,
  prod: PROD
}

const env = process.env.NODE_ENV || 'DEV'
const MONGO_URI = `mongodb://${config[env].db.user}:${config[env].db.password}@${config[env].db.host}:${config[env].db.port}/${config[env].db.name}`
console.log({ MONGO_URI })

module.exports = { MONGO_URI, connectOptions }
