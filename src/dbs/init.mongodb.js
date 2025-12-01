const { mongoose } = require('mongoose')
const { countConnet } = require('../helpers/check.connect')
const { MONGO_URI, connectOptions } = require('../configs/config.mongodb')

class Database {
  constructor() {
    this.connect()
  }
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose
      .connect(MONGO_URI, connectOptions)
      .then((_) => {
        console.log(`connect mongodb success PRO`)
      })
      .catch((err) => {
        console.log(`connect mongodb err PRO : ${err.message}`)
      })
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}
const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
