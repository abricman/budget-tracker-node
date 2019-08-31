const express = require('express')
const cors = require('cors')
const db = require('./db')
const userRouter = require('./users/routers/user.router')

// Connect to databases
db.mongoose()

// Configure express
const app = express()

app.use(cors()) // Allow requests from all origins. Used for coomunicating with react client on different ports
app.use(express.json())
app.use('/users', userRouter)

module.exports = app