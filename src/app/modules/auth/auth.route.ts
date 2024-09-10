import express from 'express'
import { UserController } from '../user/user.controller'
import { UserValidation } from '../user/user.validation'
import { validateRequest } from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidation),
  UserController.createUser,
)

export const AuthRoutes = router
