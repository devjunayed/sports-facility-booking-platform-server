import { TSlot } from './booking.interface'
import { Booking } from './booking.model'

export async function getSlot(date: string, facilityId: string) {
  // slots
  const slots: TSlot[] = []


  // Generating slots between 8:00am to 4:00pm with 2-hour intervals
  for (let i = 8; i < 16; i += 2) {
    const startTime = i
    const endTime = i + 2

    slots.push({
      startTime: `${startTime < 10 ? `0${startTime}` : startTime}:00`, // e.g. "08:00"
      endTime: `${endTime < 10 ? `0${endTime}` : endTime}:00`, // e.g. "10:00"
    })
  }


  // Fetch all bookings for the given date
  const bookings = await Booking.find({ date })


  // Filter out already booked slots
  const availableSlots = slots.filter((slot) => {
    


    return !bookings.some(
      (booking) =>
        booking.startTime === slot.startTime &&
        booking.endTime === slot.endTime &&
        `${booking.facility}` === facilityId
    )
  })



  // Return only available slots
  return availableSlots
}
