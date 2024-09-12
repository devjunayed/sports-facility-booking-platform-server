import express from 'express'
import { FacilityController } from './facility.controller'
import auth from '../../middlewares/auth'
import { validateRequest } from '../../middlewares/validateRequest'
import { FacilityValidation } from './facility.validation'

const router = express.Router()

router.post(
  '/',
  auth('admin'),
  validateRequest(FacilityValidation.createVacilityValidationSchema),
  FacilityController.createFacility,
)

export const FacilityRoutes = router
