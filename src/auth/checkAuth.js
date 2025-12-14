const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'Authorization'
}

const { findOneApiKey } = require('../models/repositories/apiKey.repo')

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]
    console.log('API KEY:', req.headers)
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden API_KEY!'
      })
    }
    const objKey = await findOneApiKey(key)
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden apiKey!'
      })
    }
    req.objKey = objKey
    return next()
  } catch (error) {
    console.log('Error check api key', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

const permission = (permission) => {
  return (req, res, next) => {
    try {
      const objKey = req.objKey
      if (!objKey.permissions || objKey.permissions.length === 0) {
        return res.status(403).json({
          message: 'permission Denied!'
        })
      }
      if (!objKey.permissions.includes(permission)) {
        return res.status(403).json({
          message: 'Forbidden permission!'
        })
      }
      return next()
    } catch (error) {
      console.log('Error check permission', error)
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }
}

module.exports = { apiKey, permission }
