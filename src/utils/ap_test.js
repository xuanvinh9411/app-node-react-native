const express = require('express')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')
const app = express()
require('dotenv').config()

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

// init db
// require('./dbs/init.mongodb')

// const { checkOverLoad } = require('./helpers/check.connect')
// checkOverLoad()
const Router = require('../routers/index')

//Init router
Router.init(app)

// handling errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Thêm 404 handler
app.use((req, res) => {
  res.status(404).send('Route not found')
})

module.exports = app
