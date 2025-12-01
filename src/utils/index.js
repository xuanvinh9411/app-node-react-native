'use strict'
const _ = require('lodash')
const mongoose = require('mongoose')

const convertToObjectIdMongodb = (id) => new mongoose.Types.ObjectId(id)

const getIntoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields)
}
module.exports = {
  convertToObjectIdMongodb,
  getIntoData
}
