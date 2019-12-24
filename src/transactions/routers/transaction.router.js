const TransactionController = require('../controllers/transaction.controller')
const AuthValidationMiddleware = require('../../common/middleware/auth/auth.validation.middleware')
const express = require('express')
const router = new express.Router()

router.get('/year/:year/month/:month', [
    AuthValidationMiddleware.validateJWT,
    TransactionController.getMonthlyTransactions
])

router.get('/:id', [
    AuthValidationMiddleware.validateJWT,
    TransactionController.getTransaction
])

router.post('/', [
    AuthValidationMiddleware.validateJWT,
    TransactionController.insertTransaction
])

router.patch('/:id', [
    AuthValidationMiddleware.validateJWT,
    TransactionController.updateTransaction
])

router.delete('/:id', [
    AuthValidationMiddleware.validateJWT,
    TransactionController.deleteTransaction
])

module.exports = router