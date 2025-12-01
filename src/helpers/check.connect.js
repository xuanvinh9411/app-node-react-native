const mongoose = require('mongoose')
const _Seconds = 5000
const os = require('os')
const countConnet = () => {
  const numConnections = mongoose.connections.length
  console.log(`Number of active MongoDB connections: ${numConnections}`)
}

const checkOverLoad = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss
    // example maximum memory connections based on number of CPU cores
    console.log(`Number of active MongoDB connections: ${numConnections}`)
    console.log(`Memory Usage (RSS): ${memoryUsage / 1024 / 1024} bytes`)
    const maxConnections = numCores * 5
    if (numConnections > maxConnections) {
      console.log(`Over load connections : ${numConnections}`)
    }
  }, _Seconds)
}
module.exports = { countConnet, checkOverLoad }
