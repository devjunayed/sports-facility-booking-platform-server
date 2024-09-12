import express from 'express'
import { BookingController } from './booking.controller'

const router = express.Router()

// checking availability of time
router.get('/check-availability', BookingController.checkAvailability)

export const BookingRoutes = router;
