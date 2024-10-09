import { Request } from 'express'
import { Booking } from './booking.model'
import { Facility } from '../facility/facility.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { getSlot } from './booking.utils'
import { initiatePayment } from '../payment/payment.utils'

// check availability
const checkAvailabilityFromDb = async (
  date: string,
  facility: string,
) => {


  // setting booking date to the current date if no date is provided
  let bookingDate = new Date().toISOString().slice(0, 10)

  if (date) {
    bookingDate = date
  }

  const slots = await getSlot(bookingDate, facility)

  return slots
}

// creating bookings
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
  const slots = await getSlot(data.date, `${facility._id}`)

  const slotAvailable = slots.some(
    (slot) =>
      slot.startTime === data.startTime && slot.endTime === data.endTime,
  )

  // throwing error if slot is not available
  if (!slotAvailable) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Slot is not available!')
  }


  // Transaction id for creating payment
  const transactionId = `TXN-${Date.now()}`;

  data.transactionId = transactionId;

  const result =  await Booking.create(data)


// payment 
const paymentData = {
  transactionId,
  totalPrice: payableAmount,
  customerName : user!.name,
  customerEmail: user!.email,
  customerPhone: user!.phone,
  customerAddress: user!.address
}

  const paymentSession = await initiatePayment(paymentData);
  
  return {result, paymentSession}
}

// getting all bookings
const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('facility').populate('user')
  return result
}

// getting user bookings
const getUserBookingsFromDB = async (req: Request) => {
  const user = await User.isUserExistsByEmail(req?.user?.email)

  const result = await Booking.find({ user: user._id }).populate('facility')

  return result
}

// cancel bookings
const canceleBookingsIntoDB = async (bookingId: string) => {
  await Booking.findByIdAndUpdate(bookingId, {
    isBooked: 'canceled',
  })

  const result = await Booking.findById(bookingId).populate('facility')
  return result
}

export const BookingService = {
  checkAvailabilityFromDb,
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  canceleBookingsIntoDB,
}
