import { TSlot } from '../modules/booking/booking.interface'

export function slot() {
  // slots
  const slots: TSlot[] = []

  // generating slots between 8:00am to 4:00pm
  for (let i = 8; i < 16; i += 2) {
    let startTime = i
    let endTime = i

    if (endTime >= 12) {
      endTime -= 12
    }
    if (startTime > 12) {
      startTime -= 12
    }

    slots.push({
      startTime: `${startTime < 10 ? startTime.toString().padStart(2, '0') : startTime}:00`,
      endTime: `${endTime < 10 ? (endTime + 2).toString().padStart(2, '0') : endTime + 2}:00`,
    })
  }

  return slots;
}
