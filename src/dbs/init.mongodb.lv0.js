'use strict'

const mongoose = require('mongoose')
const connectString = `mongodb://root:admin@123@localhost:27017/`
mongoose
  .connect(connectString)
  .then((_) => console.log(`connect mongodb success`))
  .catch((err) => console.log(`connect mongodb err : ${err.message}`))
// dev
if (1 === 0) {
  mongoose.set(`debug`, true)
  mongoose.set(`debug`, { color: true })
}
module.exports = mongoose
