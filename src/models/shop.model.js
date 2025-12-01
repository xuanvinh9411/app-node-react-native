'use strict'

const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLenght: 150
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive'
    },
    verify: {
      type: Boolean,
      default: false
    },
    roles: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: 'Shop'
  }
)

//Export the model
module.exports = mongoose.model('Shop', shopSchema)
