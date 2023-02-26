const express = require('express')

const server = express()
const data = require('./data.json')

server.use((req, res, next) => {
  let origin = req.headers.origin
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Max-Age', 6)
  next()
})
server.get('/api/get', (req, res) => {
  res.send(data)
})

server.listen('9000', () => {
  console.log('服务器端口在9000')
})
const app = express()
app.use(express.static('public'))
app.listen('8080', () => {})
