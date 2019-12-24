const CategoryController = require('../controllers/category.controller')
const AuthValidationMiddleware = require('../../common/middleware/auth/auth.validation.middleware')
const express = require('express')
const router = new express.Router()

router.get('/', [
    AuthValidationMiddleware.validateJWT,
    CategoryController.getCategories
])

router.post('/', [
    AuthValidationMiddleware.validateJWT,
    CategoryController.insertCategory
])

router.patch('/:id', [
    AuthValidationMiddleware.validateJWT,
    CategoryController.updateCategory
])

router.delete('/:id', [
    AuthValidationMiddleware.validateJWT,
    CategoryController.deleteCategory
])

module.exports = router