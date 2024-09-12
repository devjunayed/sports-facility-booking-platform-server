import express from 'express'
import { FacilityController } from './facility.controller'
import auth from '../../middlewares/auth'
import { validateRequest } from '../../middlewares/validateRequest'
import { FacilityValidation } from './facility.validation'

const router = express.Router()

// Creating Facility
router.post(
  '/',
  auth('admin'),
  validateRequest(FacilityValidation.createFacilityValidationSchema),
  FacilityController.createFacility,
)
// updating Facility
router.put(
  '/:id',
  auth('admin'),
  validateRequest(FacilityValidation.updateFacilityValidationSchema),
  FacilityController.updateFacility,
)

// soft deleting facility
router.delete(
  '/:id',
  auth('admin'),
  FacilityController.deleteFacility,
)

// get all facility
router.get(
  '/',
  FacilityController.getAllFacility,
)

export const FacilityRoutes = router
