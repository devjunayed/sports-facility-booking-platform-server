import { Request } from 'express'
import { Booking } from './booking.model'
import { Facility } from '../facility/facility.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { getSlot } from './booking.utils'

const checkAvailabilityFromDb = async (date: string) => {
  // setting booking date to the current date if no date is provided
  let bookingDate = new Date().toISOString().slice(0, 10)

  if (date) {
    bookingDate = date
  }

  const slots = await getSlot(bookingDate)

  return slots
}

const createBookingIntoDB = async (req: Request) => {
  const data = req.body
  data.user = req.user

  // get facility price
  const facility = await Facility.findById(data.facility)
  if (!facility) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Can not find facility associated with the id',
    )
  }
  const facilityPrice = facility.pricePerHour

  //calculating price
  const endTime = Number(data.endTime.split(':')[0])
  const startTime = Number(data.startTime.split(':')[0])
  const payableAmount = (endTime - startTime) * Number(facilityPrice)

  // setting payable amount
  data.payableAmount = Number(payableAmount)

  // getting user by email
  const user = await User.findOne({ email: req?.user?.email })

  // setting user id
  data.user = user?._id

  // checking if the slot is bookable
  const slots = await getSlot(data.date)

  if (!slots.includes({ startTime: data.startTime, endTime: data.endTime })) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Slot is already taken!')
  }

  const result = Booking.create(data)
  return result
}

export const BookingService = {
  checkAvailabilityFromDb,
  createBookingIntoDB,
}
