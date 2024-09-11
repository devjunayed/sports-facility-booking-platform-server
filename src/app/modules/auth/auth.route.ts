import express from 'express'
import { UserController } from '../user/user.controller'
import { UserValidation } from '../user/user.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidation),
  UserController.createUser,
)

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.logInUser,
)

export const AuthRoutes = router
