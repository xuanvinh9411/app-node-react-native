'use strict'
const _ = require('lodash')
const mongoose = require('mongoose')

const convertToObjectIdMongodb = (id) => new mongoose.Types.ObjectId(id)

const getIntoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields)
}

const getSelectData = ({ fields = [] }) => {
  return fields.fromEntries(fields.map((field) => [field, 1]))
}

const unSelectData = ({ fields = [] }) => {
  return fields.fromEntries(fields.map((field) => [field, 0]))
}

const removeUnbsefinedObject = (obj = {}) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  })
  return obj
}

module.exports = {
  convertToObjectIdMongodb,
  getIntoData,
  getSelectData,
  unSelectData,
  removeUnbsefinedObject
}
