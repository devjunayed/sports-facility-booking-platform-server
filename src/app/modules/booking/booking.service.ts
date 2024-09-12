import { slot } from '../../utils/getSlots'
import { Booking } from './booking.model'

const checkAvailabilityFromDb = async (date: string) => {
  // setting booking date to the current date if no date is provided
  let bookingDate = new Date().toISOString().slice(0, 10)

  if (date) {
    bookingDate = date
  }

  let slots = slot()

  const bookings = await Booking.find({ date: bookingDate })


  if (bookings) {
    slots = slots.filter((slot) => {
      return bookings.map(
        (booking) =>
          booking.startTime === slot.startTime &&
          booking.endTime === slot.endTime,
      )
    })
  }

  return slots
}

export const BookingService = {
  checkAvailabilityFromDb,
}
