const BudgetController = require('../controllers/budgets.controller')
const AuthValidationMiddleware = require('../../common/middleware/auth/auth.validation.middleware')
const express = require('express')
const router = new express.Router()

router.get('/overview', [
    AuthValidationMiddleware.validateJWT,
    BudgetController.getBudgetsOverviewModel
])

router.get('/:id/transactions', [
    AuthValidationMiddleware.validateJWT,
    BudgetController.getBudgetTransactions
])

router.get('/', [
    AuthValidationMiddleware.validateJWT,
    BudgetController.getBudgets
])

router.post('/', [
    AuthValidationMiddleware.validateJWT,
    BudgetController.insertBudget
])

router.patch('/:id', [
    AuthValidationMiddleware.validateJWT,
    BudgetController.updateBudget
])

router.delete('/:id', [
    AuthValidationMiddleware.validateJWT,
    BudgetController.deleteBudget
])

module.exports = router