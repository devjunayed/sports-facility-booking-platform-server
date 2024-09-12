import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { BookingService } from './booking.service'
import { Request } from 'express'

const checkAvailability = catchAsync(async (req, res) => {
  const result = await BookingService.checkAvailabilityFromDb(
    req?.query?.date as string,
  )


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Availability checked successfully',
    data: result,
  })
})

const createBooking = catchAsync(async(req, res) => {
  const result = await BookingService.createBookingIntoDB(req as Request);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  })
})

export const BookingController = {
  checkAvailability,
  createBooking
}
