const CurrenciesController = require('../controllers/currencies.controller')
const AuthValidationMiddleware = require('../../common/middleware/auth/auth.validation.middleware')
const express = require('express')
const router = new express.Router()

router.get('/', [
    AuthValidationMiddleware.validateJWT,
    CurrenciesController.getCurrencies
])

router.post('/', [
    AuthValidationMiddleware.validateJWT,
    CurrenciesController.insertCurrency
])

module.exports = router