const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./db')
const userRouter = require('./users/routers/user.router')
const transactionRouter = require('./transactions/routers/transaction.router')
const categoryRouter = require('./categories/routers/category.router')
const walletRouter = require('./wallets/routers/wallet.router')
const currenciesRouter = require('./currencies/routers/currencies.router')
const budgetsRouter = require('./budgets/routers/budgets.router')

// Connect to databases
db.mongoose()

// Configure express
const app = express()

app.use(helmet())
app.use(cors()) // Allow requests from all origins. Used for communicating with react client on different ports
app.use(express.json())
app.use('/users', userRouter)
app.use('/transactions', transactionRouter)
app.use('/categories', categoryRouter)
app.use('/wallets', walletRouter)
app.use('/currencies', currenciesRouter)
app.use('/budgets', budgetsRouter)

/* app.use('api/v1/users', userRouter)
app.use('api/v1/users/:userId/transactions', transactionRouter) */

// TODO: API versioning

module.exports = app