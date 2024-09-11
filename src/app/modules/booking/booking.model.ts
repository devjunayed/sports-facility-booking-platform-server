import { model, Schema } from 'mongoose'
import { TBooking } from './booking.interface'

const bookingSchema = new Schema<TBooking>({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  facility: {
    type: String,
    required: true,
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
})

export const Booking= model<TBooking>('Booking', bookingSchema)
