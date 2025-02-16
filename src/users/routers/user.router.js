const UserController = require('../controllers/user.controller')
const AuthValidationMiddleware = require('../../common/middleware/auth/auth.validation.middleware')
const express = require('express')
const router = new express.Router()

router.post('/', [
    UserController.insertUser
])

router.post('/sign-in', [
    UserController.signIn
])

router.post('/sign-out', [
    AuthValidationMiddleware.validateJWT,
    UserController.signOut
])

router.post('/signout-all', [
    AuthValidationMiddleware.validateJWT,
    UserController.signOutAll
])

router.get('/me', [
    AuthValidationMiddleware.validateJWT,
    UserController.getUser
])

router.patch('/me', [
    AuthValidationMiddleware.validateJWT,
    UserController.updateUser
])

router.delete('/me', [
    AuthValidationMiddleware.validateJWT,
    UserController.deleteUser
])

module.exports = router