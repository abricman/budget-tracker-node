const WalletController = require('../controllers/wallet.controller')
const AuthValidationMiddleware = require('../../common/middleware/auth/auth.validation.middleware')
const express = require('express')
const router = new express.Router()

router.get('/', [
    AuthValidationMiddleware.validateJWT,
    WalletController.getWallets
])

router.post('/', [
    AuthValidationMiddleware.validateJWT,
    WalletController.insertWallet
])

router.patch('/:id', [
    AuthValidationMiddleware.validateJWT,
    WalletController.updateWallet
])

router.delete('/:id', [
    AuthValidationMiddleware.validateJWT,
    WalletController.deleteWallet
])

module.exports = router