import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { BookingService } from './booking.service'
import { Request } from 'express'

// checking availabiliy in controllers
const checkAvailability = catchAsync(async (req, res) => {
  const result = await BookingService.checkAvailabilityFromDb(
    req?.query?.date as string,
    req?.query?.facility as string
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Availability checked successfully',
    data: result,
  })
})

// creating bookings in contrroller
const createBooking = catchAsync(async (req, res) => {
  const result = await BookingService.createBookingIntoDB(req as Request)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  })
})

// getting all bookings in controller
const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingsFromDB()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking retrieved successfully',
    data: result,
  })
})

// getting user bookings in contrroller
const getUserBookings = catchAsync(async (req, res) => {
  const result = await BookingService.getUserBookingsFromDB(req as Request)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking retrieved successfully',
    data: result,
  })
})
// cancleing user bookings in contrroller
const canceleBookings = catchAsync(async (req, res) => {
  const result = await BookingService.canceleBookingsIntoDB(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking cancelled successfully',
    data: result,
  })
})

export const BookingController = {
  checkAvailability,
  createBooking,
  getAllBookings,
  getUserBookings,
  canceleBookings,
}
