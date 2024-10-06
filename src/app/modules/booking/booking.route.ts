import express from 'express'
import { BookingController } from './booking.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

// checking availability of time
router.get('/check-availability', BookingController.checkAvailability)

// creating booking
router.post('/bookings', auth('user'), BookingController.createBooking)

// getting all bookings
router.get('/bookings', auth('admin'), BookingController.getAllBookings)

// get user bookings
router.get('/bookings/user', auth('user'), BookingController.getUserBookings)

// get user bookings
router.delete('/bookings/:id', auth('user'), BookingController.canceleBookings)

export const BookingRoutes = router
